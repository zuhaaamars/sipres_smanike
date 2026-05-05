from flask import jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user.user_models import User, MasterSiswa, MasterGuru
from app.models.user.admin_models import Admin
from app.models.user.guru_models import Guru
from app.models.user.siswa_models import Siswa
from app.models.user.staff_models import Staf 
from app.app import db
from datetime import datetime
import pandas as pd

# =================[ 1. LOGIN (Cek Verifikasi) ]=================
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"status": "error", "message": "Username dan password wajib diisi"}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        # CEK APAKAH SUDAH DIVERIFIKASI TU
        if not user.is_verified:
            return jsonify({
                "status": "error", 
                "message": "Akun Anda belum aktif. Tunggu verifikasi dari Tata Usaha."
            }), 403

        access_token = create_access_token(identity=str(user.id))
        
        profile_id = None
        if user.role == 'siswa':
            profil = Siswa.query.filter_by(user_id=user.id).first()
            profile_id = profil.id if profil else None
        elif user.role == 'guru':
            profil = Guru.query.filter_by(user_id=user.id).first()
            profile_id = profil.id if profil else None
        elif user.role in ['staf', 'staff']:
            profil = Staf.query.filter_by(user_id=user.id).first()
            profile_id = profil.id if profil else None
        elif user.role == 'admin':
            profil = Admin.query.filter_by(user_id=user.id).first()
            profile_id = profil.id if profil else None

        return jsonify({
            "status": "success",
            "message": f"Login Berhasil sebagai {user.role.capitalize()}",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "profile_id": profile_id,
                "username": user.username,
                "role": user.role
            }
        }), 200
    
    return jsonify({"status": "error", "message": "Username atau password salah"}), 401

# =================[ 2. REGISTER (TAHAP 1: VALIDASI MASTER) ]=================
def register_user():
    data = request.get_json()
    role = data.get('role') 
    username = data.get('username')
    password = data.get('password')
    reg_id = data.get('registration_id') # NIS atau NIP
    
    if not username or not password or not role or not reg_id:
        return jsonify({"status": "error", "message": "Data wajib diisi (Username, Password, Role, NIS/NIP)"}), 400

    # VALIDASI TERHADAP DATA MASTER
    if role == 'siswa':
        is_valid = MasterSiswa.query.filter_by(nis=reg_id).first()
        if not is_valid:
            return jsonify({"status": "error", "message": "NIS tidak terdaftar di data resmi sekolah!"}), 400
    elif role == 'guru':
        is_valid = MasterGuru.query.filter_by(nip=reg_id).first()
        if not is_valid:
            return jsonify({"status": "error", "message": "NIP tidak terdaftar di data resmi sekolah!"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"status": "error", "message": "Username/Nama sudah terdaftar"}), 400

    try:
        new_user = User(username=username, role=role, is_verified=False)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit() 

        tgl_str = data.get('tanggal_lahir')
        tgl_obj = datetime.strptime(tgl_str, '%Y-%m-%d').date() if tgl_str else None

        common_fields = {
            "user_id": new_user.id,
            "nama_lengkap": data.get('nama_lengkap'),
            "tempat_lahir": data.get('tempat_lahir'),
            "tanggal_lahir": tgl_obj,
            "jenis_kelamin": data.get('jenis_kelamin'),
            "alamat": data.get('alamat'),
        }

        profile = None
        if role == 'siswa':
            profile = Siswa(**common_fields, no_telp_ortu=data.get('no_telp_ortu'), nisn=reg_id)
        elif role == 'guru':
            profile = Guru(**common_fields, no_hp=data.get('no_hp'), nip=reg_id, gelar=data.get('gelar'))
        elif role in ['staf', 'staff']:
            profile = Staf(**common_fields, nip=reg_id, bagian=None)
        elif role == 'admin':
            profile = Admin(user_id=new_user.id, nama_lengkap=data.get('nama_lengkap'), email=data.get('email'))

        if profile:
            db.session.add(profile)
            db.session.commit()
            return jsonify({"status": "success", "message": "Akun berhasil dibuat", "userId": new_user.id}), 201
        
        db.session.delete(new_user)
        db.session.commit()
        return jsonify({"status": "error", "message": "Role tidak valid"}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": f"Gagal Daftar: {str(e)}"}), 500

# =================[ 3. UPDATE PROFIL (TAHAP 2) ]=================
def update_siswa_profile():
    data = request.get_json()

    try:
        if not data:
            return jsonify({"status": "error", "message": "Tidak ada data yang dikirim"}), 400

        user_id = data.get('userId')

        if not user_id:
            return jsonify({"status": "error", "message": "userId wajib dikirim"}), 400

        siswa = Siswa.query.filter_by(user_id=user_id).first()

        if not siswa:
            return jsonify({"status": "error", "message": "Data siswa tidak ditemukan"}), 404

        # UPDATE FIELD (AMAN dari null)
        siswa.nisn = data.get('nisn')
        siswa.nama_ortu = data.get('nama_ortu')
        siswa.no_telp_ortu = data.get('no_telp_ortu')
        siswa.kelas_id = data.get('kelas_id')
        siswa.jurusan_id = data.get('jurusan_id')

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Profil Siswa Berhasil Dilengkapi!"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

def update_guru_profile():
    data = request.get_json()
    user_id = data.get('userId')
    try:
        guru = Guru.query.filter_by(user_id=user_id).first()
        if not guru: return jsonify({"status": "error", "message": "Data guru tidak ditemukan"}), 404
        guru.nip = data.get('nip')
        guru.gelar = data.get('gelar')
        guru.no_hp = data.get('no_hp')
        db.session.commit()
        return jsonify({"status": "success", "message": "Profil Guru Berhasil Dilengkapi!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

def update_staf_profile():
    data = request.get_json()
    user_id = data.get('userId')
    try:
        staf = Staf.query.filter_by(user_id=user_id).first()
        if not staf: return jsonify({"status": "error", "message": "Data staf tidak ditemukan"}), 404
        staf.nip = data.get('nip')
        staf.bagian = data.get('bagian')
        db.session.commit()
        return jsonify({"status": "success", "message": "Profil Staf Berhasil Dilengkapi!"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# =================[ 4. FITUR ADMIN & IMPORT ]=================
def get_pending_users():
    users = User.query.filter_by(is_verified=False).all()
    output = [{"id": u.id, "username": u.username, "role": u.role} for u in users]
    return jsonify({"status": "success", "data": output}), 200

# app/controllers/auth_controllers.py

def approve_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"status": "error", "message": "User tidak ditemukan"}), 404
        
        user.is_verified = True  # Ubah status menjadi True
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": f"Akun {user.username} berhasil diverifikasi!"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

def import_master_siswa():
    if 'file' not in request.files: return jsonify({"status": "error", "message": "No file"}), 400
    file = request.files['file']
    try:
        df = pd.read_excel(file, sheet_name='Master_Siswa')
        for _, row in df.iterrows():
            if not MasterSiswa.query.filter_by(nis=str(row['nis'])).first():
                db.session.add(MasterSiswa(nis=str(row['nis']), nama_lengkap=row['nama_lengkap']))
        db.session.commit()
        return jsonify({"status": "success", "message": "Master Siswa Diimpor"}), 200
    except Exception as e: return jsonify({"status": "error", "message": str(e)}), 500

@jwt_required() # Menggunakan library flask-jwt-extended
def get_me():
    try:
        # get_jwt_identity biasanya mengambil ID user dari token
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"status": "error", "message": "User tidak ditemukan"}), 404
            
        return jsonify({
            "status": "success",
            "data": {
                "nama_lengkap": user.nama_lengkap,
                "role": user.role,
                "username": user.username
            }
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
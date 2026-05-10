from flask import jsonify, request
from app.app import db
from app.models.user.user_models import User
from app.models.user.siswa_models import Siswa
from app.models.user.guru_models import Guru
from app.models.user.staff_models import Staf
from flask_jwt_extended import create_access_token
import datetime

class AuthController:
    @staticmethod
    def register():
        data = request.get_json()
        
        # Validasi dasar
        if User.query.filter_by(username=data.get('username')).first():
            return jsonify({"status": "error", "message": "Username sudah terdaftar"}), 400

        # Step 1: Simpan ke tabel User 
        new_user = User(
            username=data.get('username'),
            role=data.get('role'),
            is_verified=False # Default false, nunggu TU 
        )
        new_user.set_password(data.get('password')) 
        
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Akun berhasil dibuat, silakan lengkapi profil",
            "userId": new_user.id
        }), 201

    @staticmethod
    def update_siswa_profile():
        data = request.get_json()
        user_id = data.get('user_id')
        
        # Step 2: Lengkapi profil siswa [cite: 272]
        new_profile = Siswa(
            user_id=user_id,
            nisn=data.get('nisn'),
            nama_lengkap=data.get('nama_lengkap', 'Siswa Baru'),
            kelas_id=data.get('kelas_id'),
            nama_ortu=data.get('nama_ortu'),
            no_telp_ortu=data.get('no_telp_ortu')
        )
        db.session.add(new_profile)
        db.session.commit()
        return jsonify({"status": "success", "message": "Profil siswa berhasil disimpan"}), 200

    @staticmethod
    def update_guru_profile():
        data = request.get_json()
        new_profile = Guru(
            user_id=data.get('user_id'),
            nip=data.get('nip'),
            nama_lengkap=data.get('nama_lengkap'),
            gelar=data.get('gelar'),
            jenis_kelamin=data.get('jenis_kelamin'),
            no_hp=data.get('no_hp'),
            alamat=data.get('alamat')
        )
        db.session.add(new_profile)
        db.session.commit()
        return jsonify({"status": "success", "message": "Profil guru berhasil disimpan"}), 200

    @staticmethod
    def update_staf_profile():
        data = request.get_json()
        user_id = data.get('user_id')
        
        # Validasi apakah user_id ada [cite: 68]
        if not user_id:
            return jsonify({"status": "error", "message": "User ID tidak ditemukan"}), 400

        try:
            # Sesuai dengan payload di DaftarStaff.jsx 
            new_profile = Staf(
                user_id=user_id,
                nip=data.get('nip'),
                nama_lengkap=data.get('nama_lengkap'),
                bagian=data.get('bagian'),
                no_hp=data.get('no_hp')
            )
            db.session.add(new_profile)
            db.session.commit()
            return jsonify({"status": "success", "message": "Profil staf berhasil disimpan"}), 200 # 
        except Exception as e:
            db.session.rollback()
            return jsonify({"status": "error", "message": str(e)}), 500
        
    @staticmethod
    def login():
        data = request.get_json()

        user = User.query.filter_by(
            username=data.get('username'),
            role=data.get('role')
        ).first()

        if not user or not user.check_password(data.get('password')):
            return jsonify({"status": "error", "message": "Username atau Password salah"}), 401

        if not user.is_verified:
            return jsonify({
                "status": "error",
                "message": "Akun belum diverifikasi"
            }), 403

        access_token = create_access_token(identity=str(user.id))

        # 🔥 INI FIX PENTING
        siswa = Siswa.query.filter_by(user_id=user.id).first()

        return jsonify({
            "status": "success",
            "access_token": access_token,
            "user": {
                "id": user.id,              # user id
                "siswa_id": siswa.id if siswa else None,  # 🔥 INI YANG KITA BUTUH
                "username": user.username,
                "role": user.role
            }
        }), 200
    
    @staticmethod
    def get_all_pending_users():
        try:
            users = User.query.filter_by(is_verified=False).all()
            results = [ { "id": u.id, "username": u.username, "role": u.role } for u in users ]
            
            # Bungkus dalam dictionary agar sesuai dengan response.data.data
            return jsonify({"status": "success", "data": results}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @staticmethod
    def verify_user(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
                return jsonify({"status": "error", "message": "User tidak ditemukan"}), 404
            
            user.is_verified = True
            db.session.commit()
            return jsonify({"status": "success", "message": "User berhasil diverifikasi"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"status": "error", "message": str(e)}), 500
        
    @staticmethod
    def get_all_users():
        try:
            users = User.query.all()

            results = []
            for user in users:
                results.append({
                    "id": user.id,
                    "username": user.username,
                    "role": user.role,
                    "is_verified": user.is_verified,
                    "is_active": user.is_active
                })

            return jsonify({
                "status": "success",
                "data": results
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500
    
    @staticmethod
    def delete_user(user_id):
        try:
            user = User.query.get(user_id)

            if not user:
                return jsonify({
                    "status": "error",
                    "message": "User tidak ditemukan"
                }), 404

            # NONAKTIFKAN USER
            user.is_active = False

            db.session.commit()

            return jsonify({
                "status": "success",
                "message": "User berhasil dinonaktifkan"
            }), 200

        except Exception as e:
            db.session.rollback()

            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500
    
    @staticmethod
    def update_user(user_id):
        try:
            data = request.get_json()

            user = User.query.get(user_id)

            if not user:
                return jsonify({
                    "status": "error",
                    "message": "User tidak ditemukan"
                }), 404

            user.username = data.get('username', user.username)
            user.role = data.get('role', user.role)

            db.session.commit()

            return jsonify({
                "status": "success",
                "message": "User berhasil diupdate"
            }), 200

        except Exception as e:
            db.session.rollback()

            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500
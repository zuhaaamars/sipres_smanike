import os
import base64
import math
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.app import db

from app.models.presensi.siswa_presensi_harian_models import PresensiHarian
from app.models.user.siswa_models import Siswa

UPLOAD_PATH = os.path.join(
    os.getcwd(),
    'static',
    'uploads',
    'presensi',
    'harian'
)

print("UPLOAD PATH:", UPLOAD_PATH)

SCHOOL_LAT = -7.507569
SCHOOL_LON = 111.182857
MAX_RADIUS_METERS = 100


# =========================
# HITUNG JARAK
# =========================
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    a = (
        math.sin(dphi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2)
        * math.sin(dlambda / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


os.makedirs(UPLOAD_PATH, exist_ok=True)


# =========================
# SIMPAN GAMBAR
# =========================
def save_harian_image(base64_string):
    try:
        if not base64_string:
            return None

        header, encoded = base64_string.split(',', 1)
        image_data = base64.b64decode(encoded)

        filename = f"presensi_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"
        filepath = os.path.join(UPLOAD_PATH, filename)
        print("SAVE TO:", filepath)

        with open(filepath, "wb") as f:
            f.write(image_data)

        return filepath

    except Exception as e:
        print("ERROR SAVE IMAGE:", str(e))
        return None


# =========================
# PRESENSI HARIAN
# =========================
@jwt_required()
def submit_presensi_harian():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "status": "error",
                "message": "Request harus JSON"
            }), 400

        # 🔥 JWT identity
        user_id = get_jwt_identity()

        # 🔥 FIX: ambil siswa berdasarkan user_id
        siswa = Siswa.query.filter_by(user_id=user_id).first()

        if not siswa:
            return jsonify({
                "status": "error",
                "message": "Siswa tidak ditemukan",
                "debug_id": user_id
            }), 404

        foto_raw = data.get('foto_bukti')
        lat = data.get('latitude')
        lng = data.get('longitude')

        if lat is None or lng is None:
            return jsonify({
                "status": "error",
                "message": "Lokasi tidak ditemukan"
            }), 400

        try:
            lat = float(lat)
            lng = float(lng)
        except:
            return jsonify({
                "status": "error",
                "message": "Format lokasi tidak valid"
            }), 400

        jarak = calculate_distance(lat, lng, SCHOOL_LAT, SCHOOL_LON)

        if jarak > MAX_RADIUS_METERS:
            return jsonify({
                "status": "error",
                "message": f"Di luar radius ({jarak:.1f} meter)"
            }), 403

        if not foto_raw:
            return jsonify({
                "status": "error",
                "message": "Foto wajib diisi"
            }), 400

        foto_path = save_harian_image(foto_raw)

        if not foto_path:
            return jsonify({
                "status": "error",
                "message": "Gagal simpan foto"
            }), 400

        today = datetime.now().date()

        # 🔥 FIX: pakai siswa.id (BUKAN Siswa.id)
        existing = PresensiHarian.query.filter_by(
            siswa_id=siswa.id,
            tanggal=today
        ).first()

        # =========================
        # CHECK IN
        # =========================
        if not existing:
            new_data = PresensiHarian(
                siswa_id=siswa.id,
                tanggal=today,
                jam_masuk=datetime.now(),
                foto_bukti=foto_path,
                latitude=lat,
                longitude=lng,
                status=data.get('status', 'Hadir')
            )
            db.session.add(new_data)
            is_check_in = True
            is_check_out = False

        # =========================
        # CHECK OUT
        # =========================
        else:
            if existing.jam_pulang:
                return jsonify({
                    "status": "error",
                    "message": "Sudah presensi pulang"
                }), 400

            existing.jam_pulang = datetime.now()
            is_check_in = False
            is_check_out = True

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Presensi berhasil",
            "check_in": is_check_in,
            "check_out": is_check_out
        }), 201

    except Exception as e:
        db.session.rollback()
        print("🔥 ERROR:", str(e))

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# RIWAYAT
# =========================
def get_riwayat_presensi(siswa_id):
    try:
        data = PresensiHarian.query.filter_by(
            siswa_id=siswa_id
        ).order_by(
            PresensiHarian.tanggal.desc(),
            PresensiHarian.id.desc()
        ).all()

        output = []

        for r in data:
            foto_url = (
                f"http://localhost:5000/{r.foto_bukti.replace('\\', '/')}"
                if r.foto_bukti else None
            )

            output.append({
                "id": r.id,
                "tanggal": r.tanggal.strftime('%d %b %Y'),
                "jam_masuk": r.jam_masuk.strftime('%H:%M') if r.jam_masuk else "--:--",
                "jam_pulang": r.jam_pulang.strftime('%H:%M') if r.jam_pulang else "--:--",
                "status": r.status,
                "foto": foto_url,
                "latitude": r.latitude,
                "longitude": r.longitude
            })

        return jsonify({
            "status": "success",
            "data": output
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
# =========================
# REKAP HARIAN
# =========================
def get_rekap_harian():
    try:

        data = PresensiHarian.query.order_by(
            PresensiHarian.tanggal.desc(),
            PresensiHarian.id.desc()
        ).all()

        output = []

        for r in data:

            siswa = Siswa.query.get(r.siswa_id)

            foto_url = (
                f"http://localhost:5001/{r.foto_bukti.replace('\\', '/')}"
                if r.foto_bukti else None
            )

            output.append({
                "id": r.id,
                "nama": siswa.nama_lengkap if siswa else "-",
                "nisn": siswa.nisn if siswa else "-",
                "status": r.status,
                "tanggal": r.tanggal.strftime('%d %b %Y'),

                "jam_masuk": (
                    r.jam_masuk.strftime('%H:%M')
                    if r.jam_masuk else "--:--"
                ),

                "jam_pulang": (
                    r.jam_pulang.strftime('%H:%M')
                    if r.jam_pulang else "--:--"
                ),

                "foto": foto_url,
                "latitude": r.latitude,
                "longitude": r.longitude
            })

        return jsonify({
            "status": "success",
            "data": output
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
from flask import request
from flask_jwt_extended import get_jwt_identity
from app.app import db
from datetime import datetime, timedelta
from sqlalchemy import text


# =========================
# 🔥 TAMBAH PRESENSI
# =========================
def tambah_presensi_controller():
    try:
        data = request.json

        user = get_jwt_identity()
        siswa_id = user.get('id') if isinstance(user, dict) else int(user)

        qr_code = data.get('qr_code')

        if qr_code:
            try:
                parts = qr_code.split('|')

                if len(parts) >= 6:
                    presensi_id = int(parts[0])
                    mapel = parts[1]
                    kelas = parts[2]
                    jam = parts[3]
                    waktu_qr = parts[4]
                    guru_id = parts[5]
                else:
                    return {"status": "error", "message": "Format QR tidak valid"}, 400
            except:
                return {"status": "error", "message": "Format QR tidak valid"}, 400
        else:
            presensi_id = data.get('presensi_id')
            mapel = data.get('mapel')
            kelas = data.get('kelas')
            jam = data.get('jam')
            waktu_qr = data.get('waktu')
            guru_id = None

        if not mapel or not kelas or not jam or not waktu_qr:
            return {"status": "error", "message": "Data tidak lengkap"}, 400

        try:
            waktu_qr = datetime.fromisoformat(waktu_qr)
        except:
            return {"status": "error", "message": "Format waktu QR tidak valid"}, 400

        sekarang = datetime.utcnow()

        # ⏱️ expired 5 menit
        if sekarang - waktu_qr > timedelta(minutes=5):
            return {"status": "error", "message": "QR sudah kadaluarsa"}, 400

        # 🔹 cek duplikat
        cek = db.session.execute(text("""
            SELECT * FROM siswa_presensiqr
            WHERE siswa_id = :siswa_id
            AND presensi_id = :presensi_id
        """), {
            "siswa_id": siswa_id,
            "presensi_id": presensi_id
        }).fetchone()

        if cek:
            return {"status": "error", "message": "Kamu sudah presensi"}, 400

        # 🔹 insert
        db.session.execute(text("""
            INSERT INTO siswa_presensiqr 
            (presensi_id, mapel, kelas, jam, waktu, siswa_id, guru_id)
            VALUES 
            (:presensi_id, :mapel, :kelas, :jam, :waktu, :siswa_id, :guru_id)
        """), {
            "presensi_id": presensi_id,
            "mapel": mapel,
            "kelas": kelas,
            "jam": jam,
            "waktu": sekarang,
            "siswa_id": siswa_id,
            "guru_id": guru_id
        })

        db.session.commit()

        return {
            "status": "success",
            "message": "Presensi berhasil disimpan"
        }, 201

    except Exception as e:
        return {"status": "error", "message": str(e)}, 500


# =========================
# 🔥 GET PRESENSI
# =========================
def get_presensi_controller():
    try:
        result = db.session.execute(text("""
            SELECT * FROM siswa_presensiqr ORDER BY waktu DESC
        """)).fetchall()

        data = []
        for row in result:
            data.append({
                "id": row.id,
                "presensi_id": row.presensi_id,
                "mapel": row.mapel,
                "kelas": row.kelas,
                "jam": row.jam,
                "waktu": row.waktu,
                "siswa_id": row.siswa_id,
                "guru_id": row.guru_id
            })

        return data, 200

    except Exception as e:
        return {"status": "error", "message": str(e)}, 500


# =========================
# 🔥 GENERATE QR
# =========================
def generate_qr_controller():
    try:
        data = request.get_json()

        user = get_jwt_identity()
        guru_id = user.get('id') if isinstance(user, dict) else int(user)

        mapel = data.get('mapel')
        kelas = data.get('kelas')
        jam = data.get('jam')

        if not mapel or not kelas or not jam:
            return {"status": "error", "message": "Data tidak lengkap"}, 400

        sekarang = datetime.utcnow()

        db.session.execute(text("""
            INSERT INTO presensiqr (mapel, kelas, jam, waktu, guru_id)
            VALUES (:mapel, :kelas, :jam, :waktu, :guru_id)
        """), {
            "mapel": mapel,
            "kelas": kelas,
            "jam": jam,
            "waktu": sekarang,
            "guru_id": guru_id
        })

        db.session.commit()

        # ⚠️ MySQL only
        presensi_id = db.session.execute(
            text("SELECT LAST_INSERT_ID()")
        ).fetchone()[0]

        qr_string = f"{presensi_id}|{mapel}|{kelas}|{jam}|{sekarang.isoformat()}|{guru_id}"

        return {
            "status": "success",
            "qr_code": qr_string
        }, 201

    except Exception as e:
        print("🔥 ERROR GENERATE:", e)
        return {"status": "error", "message": str(e)}, 500
from flask import request
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import text
from app.app import db
from datetime import datetime


def scan_presensi_controller():
    try:
        data = request.get_json()
        user = get_jwt_identity()

        # 🔹 Ambil siswa_id dari JWT (safe)
        try:
            if isinstance(user, dict):
                siswa_id = user.get('id')
            else:
                siswa_id = int(user)
        except:
            return {
                "status": "error",
                "message": "Token tidak valid"
            }, 401

        # 🔹 Ambil QR
        qr_code = data.get('qr_code')

        if not qr_code:
            return {
                "status": "error",
                "message": "QR tidak ada"
            }, 400

        parts = qr_code.split('|')

        if len(parts) < 4:
            return {
                "status": "error",
                "message": "QR tidak valid"
            }, 400

        # 🔹 Parsing QR
        try:
            presensi_id = int(parts[0])
            mapel = parts[1]
            kelas = parts[2]
            jam = parts[3]
        except:
            return {
                "status": "error",
                "message": "Data QR tidak valid"
            }, 400

        # 🔹 Cek QR di DB
        cek_qr = db.session.execute(text("""
            SELECT id FROM presensiqr WHERE id = :id
        """), {"id": presensi_id}).fetchone()

        if not cek_qr:
            return {
                "status": "error",
                "message": "QR tidak ditemukan"
            }, 404

        # 🔹 Cek duplikat presensi
        cek = db.session.execute(text("""
            SELECT id FROM presensi_siswa
            WHERE presensi_id = :presensi_id
            AND siswa_id = :siswa_id
            LIMIT 1
        """), {
            "presensi_id": presensi_id,
            "siswa_id": siswa_id
        }).fetchone()

        if cek:
            return {
                "status": "error",
                "message": "Kamu sudah melakukan presensi untuk sesi ini"
            }, 400

        # 🔹 Insert presensi
        db.session.execute(text("""
            INSERT INTO presensi_siswa 
            (siswa_id, presensi_id, mapel, kelas, jam, waktu_scan)
            VALUES (:siswa_id, :presensi_id, :mapel, :kelas, :jam, :waktu_scan)
        """), {
            "siswa_id": siswa_id,
            "presensi_id": presensi_id,
            "mapel": mapel,
            "kelas": kelas,
            "jam": jam,
            "waktu_scan": datetime.utcnow()
        })

        db.session.commit()

        return {
            "status": "success",
            "message": "Presensi berhasil"
        }, 200

    except Exception as e:
        print("🔥 ERROR DETAIL:", e)
        return {
            "status": "error",
            "message": str(e)
        }, 500
from flask import request
from app.app import db
from app.models.master.mapel_models import Mapel


# 🔹 GET semua mapel
def get_mapel_controller():
    try:
        data = Mapel.query.all()
        result = [item.to_dict() for item in data]

        return result, 200

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }, 500


# 🔹 POST tambah mapel
def tambah_mapel_controller():
    try:
        data = request.json

        # validasi sederhana
        if not data.get('kode_mapel') or not data.get('nama_mapel'):
            return {
                "status": "error",
                "message": "Data tidak lengkap"
            }, 400

        new_mapel = Mapel(
            kode_mapel=data['kode_mapel'],
            nama_mapel=data['nama_mapel'],
            kelompok=data.get('kelompok')  # optional
        )

        db.session.add(new_mapel)
        db.session.commit()

        return {
            "status": "success",
            "message": "Mapel berhasil ditambahkan"
        }, 201

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }, 500
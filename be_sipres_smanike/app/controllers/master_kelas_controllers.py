from flask import request, jsonify
from app.app import db
from app.models.master.kelas_models import Kelas

# =========================
# GET ALL KELAS
# =========================
def get_all_kelas():
    try:
        data = Kelas.query.all()

        return jsonify({
            "status": "success",
            "data": [k.to_dict() for k in data]
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# CREATE KELAS
# =========================
def create_kelas():
    try:
        data = request.get_json()

        if not data.get("kelas") or not data.get("jurusan_id") or not data.get("wali_kelas"):
            return jsonify({
                "status": "error",
                "message": "Semua field wajib diisi"
            }), 400

        new_kelas = Kelas(
            kelas=data["kelas"],
            jurusan_id=data["jurusan_id"],
            wali_kelas=data["wali_kelas"]
        )

        db.session.add(new_kelas)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Kelas berhasil ditambahkan"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# DELETE KELAS
# =========================
def delete_kelas(id):
    try:
        kelas = Kelas.query.get(id)

        if not kelas:
            return jsonify({
                "status": "error",
                "message": "Kelas tidak ditemukan"
            }), 404

        db.session.delete(kelas)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Kelas berhasil dihapus"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# =========================
# UPDATE KELAS
# =========================
def update_kelas(id):
    try:
        data = request.get_json()

        kelas = Kelas.query.get(id)

        if not kelas:
            return jsonify({
                "status": "error",
                "message": "Kelas tidak ditemukan"
            }), 404

        kelas.kelas = data.get("kelas", kelas.kelas)
        kelas.jurusan_id = data.get("jurusan_id", kelas.jurusan_id)
        kelas.wali_kelas = data.get("wali_kelas", kelas.wali_kelas)

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Kelas berhasil diupdate"
        }), 200

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
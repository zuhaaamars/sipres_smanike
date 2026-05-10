from flask import request, jsonify
from app.app import db
from app.models.master.mapel_models import Mapel


def get_all_mapel():
    try:
        data = Mapel.query.all()

        return jsonify({
            "status": "success",
            "data": [m.to_dict() for m in data]
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


def create_mapel():
    try:
        data = request.get_json()

        if not data.get("kode_mapel") or not data.get("nama_mapel") or not data.get("kelompok"):
            return jsonify({"status": "error", "message": "Semua field wajib diisi"}), 400

        exist = Mapel.query.filter_by(kode_mapel=data["kode_mapel"]).first()
        if exist:
            return jsonify({"status": "error", "message": "Kode mapel sudah digunakan"}), 400

        new_mapel = Mapel(
            kode_mapel=data["kode_mapel"],
            nama_mapel=data["nama_mapel"],
            kelompok=data["kelompok"]
        )

        db.session.add(new_mapel)
        db.session.commit()

        return jsonify({"status": "success", "message": "Mapel berhasil ditambahkan"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500


def delete_mapel(id):
    try:
        mapel = Mapel.query.get(id)

        if not mapel:
            return jsonify({"status": "error", "message": "Mapel tidak ditemukan"}), 404

        db.session.delete(mapel)
        db.session.commit()

        return jsonify({"status": "success", "message": "Mapel berhasil dihapus"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
    
def update_mapel(id):
    try:
        data = request.get_json()

        mapel = Mapel.query.get(id)

        if not mapel:
            return jsonify({
                "status": "error",
                "message": "Mapel tidak ditemukan"
            }), 404

        mapel.kode_mapel = data.get("kode_mapel", mapel.kode_mapel)
        mapel.nama_mapel = data.get("nama_mapel", mapel.nama_mapel)
        mapel.kelompok = data.get("kelompok", mapel.kelompok)

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Mapel berhasil diupdate"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
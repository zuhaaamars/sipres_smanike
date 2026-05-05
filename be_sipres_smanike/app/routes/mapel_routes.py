from flask import Blueprint, request, jsonify
from app.app import db
from app.models.master.mapel_models import Mapel

mapel_bp = Blueprint('mapel_bp', __name__, url_prefix='/api/master-mapel')


# =========================
# GET ALL MAPEL
# =========================
@mapel_bp.route('', methods=['GET'])
def get_mapel():
    try:
        data = Mapel.query.all()
        return jsonify({
            "status": "success",
            "data": [m.to_dict() for m in data]
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# ADD MAPEL
# =========================
@mapel_bp.route('', methods=['POST'])
def add_mapel():
    try:
        data = request.get_json()

        kode_mapel = data.get("kode_mapel")
        nama_mapel = data.get("nama_mapel")
        kelompok = data.get("kelompok")

        if not kode_mapel or not nama_mapel or not kelompok:
            return jsonify({
                "status": "error",
                "message": "Semua field wajib diisi"
            }), 400

        new_mapel = Mapel(
            kode_mapel=kode_mapel,
            nama_mapel=nama_mapel,
            kelompok=kelompok
        )

        db.session.add(new_mapel)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Mapel berhasil ditambahkan"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# DELETE MAPEL
# =========================
@mapel_bp.route('/<int:id>', methods=['DELETE'])
def delete_mapel(id):
    try:
        mapel = Mapel.query.get(id)

        if not mapel:
            return jsonify({
                "status": "error",
                "message": "Mapel tidak ditemukan"
            }), 404

        db.session.delete(mapel)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Mapel berhasil dihapus"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
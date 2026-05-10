from flask import request, jsonify
from app.app import db
from app.models.master.master_jam_models import Jam
from datetime import datetime


def parse_time(value):
    """
    aman untuk: 08:00 / 08:00:00
    """
    if not value:
        return None

    formats = ["%H:%M", "%H:%M:%S"]

    for fmt in formats:
        try:
            return datetime.strptime(value, fmt).time()
        except ValueError:
            continue

    return None


# =========================
# GET ALL
# =========================
def get_all_jam():
    data = Jam.query.all()
    return jsonify({
        "status": "success",
        "data": [j.to_dict() for j in data]
    }), 200


# =========================
# CREATE
# =========================
def create_jam():
    try:
        data = request.get_json()

        jam_mulai = parse_time(data.get("jam_mulai"))
        jam_selesai = parse_time(data.get("jam_selesai"))

        if not jam_mulai or not jam_selesai:
            return jsonify({
                "status": "error",
                "message": "Format jam tidak valid"
            }), 400

        new_jam = Jam(
            jam_mulai=jam_mulai,
            jam_selesai=jam_selesai
        )

        db.session.add(new_jam)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Jam berhasil ditambahkan"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# DELETE
# =========================
def delete_jam(id):
    try:
        data = Jam.query.get(id)

        if not data:
            return jsonify({
                "status": "error",
                "message": "Data tidak ditemukan"
            }), 404

        db.session.delete(data)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Jam dihapus"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
def update_jam(id):
    try:
        data = request.get_json()

        jam = Jam.query.get(id)

        if not jam:
            return jsonify({
                "status": "error",
                "message": "Data tidak ditemukan"
            }), 404

        jam_mulai = parse_time(data.get("jam_mulai"))
        jam_selesai = parse_time(data.get("jam_selesai"))

        if jam_mulai:
            jam.jam_mulai = jam_mulai

        if jam_selesai:
            jam.jam_selesai = jam_selesai

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Jam berhasil diupdate"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
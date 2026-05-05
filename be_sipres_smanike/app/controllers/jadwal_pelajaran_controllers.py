from flask import request, jsonify
from app.models.master.jadwal_pelajaran_models import JadwalPelajaran
from app.app import db


# =========================
# GET ALL JADWAL
# =========================
def get_all_jadwal():
    try:
        data = JadwalPelajaran.query.all()

        result = []
        for j in data:
            result.append({
                "id": j.id,
                "kelas": j.kelas.nama_kelas if j.kelas else None,
                "mapel": j.mapel.nama_mapel if j.mapel else None,
                "guru": j.guru.nama_lengkap if j.guru else None,
                "hari": j.hari,
                "jam_mulai": str(j.jam_mulai),
                "jam_selesai": str(j.jam_selesai),
                "semester": j.semester,
                "tahun_ajaran": j.tahun_ajaran
            })

        return jsonify({
            "status": "success",
            "data": result
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# CREATE JADWAL
# =========================
def create_jadwal():
    try:
        data = request.get_json()

        new_jadwal = JadwalPelajaran(
            kelas_id=data.get("kelas_id"),
            mapel_id=data.get("mapel_id"),
            guru_id=data.get("guru_id"),
            hari=data.get("hari"),
            jam_mulai=data.get("jam_mulai"),
            jam_selesai=data.get("jam_selesai"),
            semester=data.get("semester"),
            tahun_ajaran=data.get("tahun_ajaran")
        )

        db.session.add(new_jadwal)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Jadwal berhasil ditambahkan"
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# DELETE JADWAL
# =========================
def delete_jadwal(id):
    try:
        jadwal = JadwalPelajaran.query.get(id)

        if not jadwal:
            return jsonify({
                "status": "error",
                "message": "Data tidak ditemukan"
            }), 404

        db.session.delete(jadwal)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Jadwal berhasil dihapus"
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
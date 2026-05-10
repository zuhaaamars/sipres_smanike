from flask import jsonify, request

from app.models.master.master_siswa_models import MasterSiswa
from app.app import db

# =========================
# GET ALL SISWA
# =========================
def get_all_siswa():

    try:

        data = MasterSiswa.query.all()

        output = []

        for s in data:

            output.append({
                "nis": s.nis,
                "nama_lengkap": s.nama_lengkap
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
# DETAIL SISWA
# =========================
def detail_siswa(nis):

    try:

        siswa = MasterSiswa.query.get(nis)

        if not siswa:
            return jsonify({
                "status": "error",
                "message": "Data siswa tidak ditemukan"
            }), 404

        return jsonify({
            "status": "success",
            "data": {
                "nis": siswa.nis,
                "nama_lengkap": siswa.nama_lengkap
            }
        }), 200

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# TAMBAH SISWA
# =========================
def tambah_siswa():

    try:

        data = request.get_json()

        nis = data.get('nis')
        nama_lengkap = data.get('nama_lengkap')

        if not nis or not nama_lengkap:
            return jsonify({
                "status": "error",
                "message": "NIS dan Nama Lengkap wajib diisi"
            }), 400

        cek_siswa = MasterSiswa.query.get(nis)

        if cek_siswa:
            return jsonify({
                "status": "error",
                "message": "NIS sudah digunakan"
            }), 400

        siswa = MasterSiswa(
            nis=nis,
            nama_lengkap=nama_lengkap
        )

        db.session.add(siswa)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Data siswa berhasil ditambahkan"
        }), 201

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# UPDATE SISWA
# =========================
def update_siswa(nis):

    try:

        siswa = MasterSiswa.query.get(nis)

        if not siswa:
            return jsonify({
                "status": "error",
                "message": "Data siswa tidak ditemukan"
            }), 404

        data = request.get_json()

        siswa.nama_lengkap = data.get(
            'nama_lengkap',
            siswa.nama_lengkap
        )

        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Data siswa berhasil diupdate"
        }), 200

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================
# DELETE SISWA
# =========================
def delete_siswa(nis):

    try:

        siswa = MasterSiswa.query.get(nis)

        if not siswa:
            return jsonify({
                "status": "error",
                "message": "Data siswa tidak ditemukan"
            }), 404

        db.session.delete(siswa)
        db.session.commit()

        return jsonify({
            "status": "success",
            "message": "Data siswa berhasil dihapus"
        }), 200

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
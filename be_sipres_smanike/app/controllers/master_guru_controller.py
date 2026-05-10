from flask import request, jsonify
from app.models.master.master_guru_models import MasterGuru
from app.app import db

# GET ALL
def get_guru():

    guru = MasterGuru.query.all()

    return jsonify({
        "success": True,
        "data": [g.to_dict() for g in guru]
    })


# DETAIL
def detail_guru(nip):

    guru = MasterGuru.query.get(nip)

    if not guru:
        return jsonify({
            "success": False,
            "message": "Data guru tidak ditemukan"
        }), 404

    return jsonify({
        "success": True,
        "data": guru.to_dict()
    })


# CREATE
def tambah_guru():

    data = request.get_json()

    nip = data.get('nip')
    nama_lengkap = data.get('nama_lengkap')

    if not nip or not nama_lengkap:
        return jsonify({
            "success": False,
            "message": "NIP dan Nama Lengkap wajib diisi"
        }), 400

    cek_nip = MasterGuru.query.get(nip)

    if cek_nip:
        return jsonify({
            "success": False,
            "message": "NIP sudah digunakan"
        }), 400

    guru = MasterGuru(
        nip=nip,
        nama_lengkap=nama_lengkap
    )

    db.session.add(guru)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Data guru berhasil ditambahkan",
        "data": guru.to_dict()
    })


# UPDATE
def update_guru(nip):

    guru = MasterGuru.query.get(nip)

    if not guru:
        return jsonify({
            "success": False,
            "message": "Data guru tidak ditemukan"
        }), 404

    data = request.get_json()

    guru.nama_lengkap = data.get(
        'nama_lengkap',
        guru.nama_lengkap
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Data guru berhasil diupdate",
        "data": guru.to_dict()
    })


# DELETE
def delete_guru(nip):

    guru = MasterGuru.query.get(nip)

    if not guru:
        return jsonify({
            "success": False,
            "message": "Data guru tidak ditemukan"
        }), 404

    db.session.delete(guru)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Data guru berhasil dihapus"
    })
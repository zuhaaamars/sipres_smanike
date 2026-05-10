from flask import Blueprint

from app.controllers.master_siswa_controllers import (
    get_all_siswa,
    detail_siswa,
    tambah_siswa,
    update_siswa,
    delete_siswa
)

# =========================
# BLUEPRINT
# =========================
siswa_bp = Blueprint(
    'siswa_bp',
    __name__,
    url_prefix='/api/siswa'
)

# =========================
# GET ALL
# =========================
@siswa_bp.route('/', methods=['GET'])
def all_siswa():
    return get_all_siswa()

# =========================
# GET DETAIL
# =========================
@siswa_bp.route('/<string:nis>', methods=['GET'])
def get_detail_siswa(nis):
    return detail_siswa(nis)

# =========================
# TAMBAH
# =========================
@siswa_bp.route('/', methods=['POST'])
def create_siswa():
    return tambah_siswa()

# =========================
# UPDATE
# =========================
@siswa_bp.route('/<string:nis>', methods=['PUT'])
def edit_siswa(nis):
    return update_siswa(nis)

# =========================
# DELETE
# =========================
@siswa_bp.route('/<string:nis>', methods=['DELETE'])
def remove_siswa(nis):
    return delete_siswa(nis)
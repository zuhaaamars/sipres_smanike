from flask import Blueprint
from app.controllers.master_kelas_controllers import (
    get_all_kelas,
    create_kelas,
    update_kelas,
    delete_kelas
)

kelas_bp = Blueprint('kelas_bp', __name__)

# =========================
# GET ALL KELAS
# =========================
@kelas_bp.route('/', methods=['GET'])
def get_kelas():
    return get_all_kelas()


# =========================
# CREATE KELAS
# =========================
@kelas_bp.route('/', methods=['POST'])
def tambah_kelas():
    return create_kelas()


# =========================
# UPDATE KELAS
# =========================
@kelas_bp.route('/<int:id>', methods=['PUT'])
def edit_kelas(id):
    return update_kelas(id)


# =========================
# DELETE KELAS
# =========================
@kelas_bp.route('/<int:id>', methods=['DELETE'])
def hapus_kelas(id):
    return delete_kelas(id)
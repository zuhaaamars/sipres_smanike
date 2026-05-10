from flask import Blueprint
from app.controllers.master_mapel_controllers import (
    get_all_mapel,
    create_mapel,
    delete_mapel,
    update_mapel   # 🔥 TAMBAH INI
)

mapel_bp = Blueprint('mapel_bp', __name__)

# =========================
# GET ALL MAPEL
# =========================
@mapel_bp.route('/', methods=['GET'])
def get_mapel():
    return get_all_mapel()

# =========================
# ADD MAPEL
# =========================
@mapel_bp.route('/', methods=['POST'])
def tambah_mapel():
    return create_mapel()

# =========================
# UPDATE MAPEL 🔥 TAMBAHAN
# =========================
@mapel_bp.route('/<int:id>', methods=['PUT'])
def edit_mapel(id):
    return update_mapel(id)

# =========================
# DELETE MAPEL
# =========================
@mapel_bp.route('/<int:id>', methods=['DELETE'])
def hapus_mapel(id):
    return delete_mapel(id)
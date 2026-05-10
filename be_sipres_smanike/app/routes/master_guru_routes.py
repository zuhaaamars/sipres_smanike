from flask import Blueprint

from app.controllers.master_guru_controller import (
    get_guru,
    detail_guru,
    tambah_guru,
    update_guru,
    delete_guru
)

guru_bp = Blueprint('guru_bp', __name__)

# GET ALL GURU
@guru_bp.route('/', methods=['GET'])
def route_get_guru():
    return get_guru()

# GET DETAIL GURU
@guru_bp.route('/<string:nip>', methods=['GET'])
def route_detail_guru(nip):
    return detail_guru(nip)

# TAMBAH GURU
@guru_bp.route('/', methods=['POST'])
def route_tambah_guru():
    return tambah_guru()

# UPDATE GURU
@guru_bp.route('/<string:nip>', methods=['PUT'])
def route_update_guru(nip):
    return update_guru(nip)

# DELETE GURU
@guru_bp.route('/<string:nip>', methods=['DELETE'])
def route_delete_guru(nip):
    return delete_guru(nip)
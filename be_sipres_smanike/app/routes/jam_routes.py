from flask import Blueprint
from app.controllers.master_jam_controllers import (
    get_all_jam,
    create_jam,
    delete_jam,
    update_jam
)

jam_bp = Blueprint('jam_bp', __name__)

@jam_bp.route('/', methods=['GET'], strict_slashes=False)
def get_jam():
    return get_all_jam()

@jam_bp.route('/', methods=['POST'], strict_slashes=False)
def add_jam():
    return create_jam()

@jam_bp.route('/<int:id>', methods=['DELETE'])
def remove_jam(id):
    return delete_jam(id)

@jam_bp.route('/<int:id>', methods=['PUT'])
def edit_jam(id):
    return update_jam(id)
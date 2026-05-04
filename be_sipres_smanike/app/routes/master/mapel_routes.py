from flask import Blueprint, jsonify
from app.controllers.mapel_controller import (
    get_mapel_controller,
    tambah_mapel_controller
)

mapel_bp = Blueprint('mapel_bp', __name__)


# 🔹 GET semua mapel
@mapel_bp.route('/', methods=['GET'])
def get_mapel():
    response, status = get_mapel_controller()
    return jsonify(response), status


# 🔹 POST tambah mapel
@mapel_bp.route('/', methods=['POST'])
def tambah_mapel():
    response, status = tambah_mapel_controller()
    return jsonify(response), status
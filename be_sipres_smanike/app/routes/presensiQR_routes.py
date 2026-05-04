from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.controllers.presensiQR_controller import (tambah_presensi_controller, get_presensi_controller, generate_qr_controller)

presensiQR_bp = Blueprint('presensiQR_bp', __name__)


# =========================
# 🔹 POST: SIMPAN PRESENSI
# =========================
@presensiQR_bp.route('/', methods=['POST'])
@jwt_required()
def tambah_presensi():
    response, status = tambah_presensi_controller()
    return jsonify(response), status


# =========================
# 🔹 GET: AMBIL PRESENSI
# =========================
@presensiQR_bp.route('/', methods=['GET'])
def get_presensi():
    response, status = get_presensi_controller()
    return jsonify(response), status


# =========================
# 🔹 GENERATE QR
# =========================
@presensiQR_bp.route('/generate', methods=['POST'])
@jwt_required()
def generate_qr():
    response, status = generate_qr_controller()
    return jsonify(response), status
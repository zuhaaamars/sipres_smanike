from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.controllers.presensi_siswa_controller import scan_presensi_controller

presensi_bp = Blueprint('presensi_siswa', __name__)


# 🔹 Route Scan Presensi Mapel
@presensi_bp.route('/mapel', methods=['POST'])
@jwt_required()
def scan_presensi():
    response, status = scan_presensi_controller()
    return jsonify(response), status
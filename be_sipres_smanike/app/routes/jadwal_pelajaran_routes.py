from flask import Blueprint
from app.controllers.jadwal_pelajaran_controllers import (
    get_all_jadwal,
    create_jadwal,
    delete_jadwal
)

jadwal_bp = Blueprint('jadwal_bp', __name__)


# =========================
# ROUTES JADWAL PELAJARAN
# =========================

# GET ALL
jadwal_bp.route('/jadwal', methods=['GET'])(get_all_jadwal)

# CREATE
jadwal_bp.route('/jadwal', methods=['POST'])(create_jadwal)

# DELETE
jadwal_bp.route('/jadwal/<int:id>', methods=['DELETE'])(delete_jadwal)
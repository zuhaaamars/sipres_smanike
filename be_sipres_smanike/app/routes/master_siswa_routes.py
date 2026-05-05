from flask import Blueprint
from app.controllers.master_siswa_controllers import get_all_siswa

siswa_bp = Blueprint('siswa_bp', __name__, url_prefix='/api/siswa')

@siswa_bp.route('/all', methods=['GET'])
def all_siswa():
    return get_all_siswa()
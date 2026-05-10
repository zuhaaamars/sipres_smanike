from flask import Blueprint
from app.controllers.siswa_presensi_harian_controllers import (submit_presensi_harian,get_riwayat_presensi,get_rekap_harian)
from app.controllers.generate_qr_guru_controllers import PresensiQRController
from app.controllers.scan_qr_siswa_controllers import PresensiSiswaController
from app.controllers.master_mapel_controllers import ( get_all_mapel, create_mapel, delete_mapel)

# PRESENSI HARIAN
harian_bp = Blueprint('harian_bp', __name__)

@harian_bp.route('/harian', methods=['POST'])
def harian_route():
    return submit_presensi_harian()

@harian_bp.route('/riwayat/<int:siswa_id>', methods=['GET'])
def riwayat_route(siswa_id):
    return get_riwayat_presensi(siswa_id)

@harian_bp.route('/rekap-guru', methods=['GET'])
def rekap_harian_route():
    return get_rekap_harian()

# PRESENSI MAPEL
presensi_mapel_bp = Blueprint('presensi_mapel_bp',__name__)

@presensi_mapel_bp.route('/create-qr', methods=['POST'])
def create_qr_route():
    return PresensiQRController.create_qr()


@presensi_mapel_bp.route('/qr', methods=['GET'])
def get_all_qr_route():
    return PresensiQRController.get_all_qr()


@presensi_mapel_bp.route('/scan', methods=['POST'])
def scan_qr_route():
    return PresensiSiswaController.scan_qr()


@presensi_mapel_bp.route('/riwayat/<int:siswa_id>', methods=['GET'])
def riwayat_mapel_route(siswa_id):
    return PresensiSiswaController.get_riwayat_siswa(siswa_id)

@presensi_mapel_bp.route('/rekap-guru', methods=['GET'])
def rekap_guru_route():
    return PresensiSiswaController.get_rekap_guru()
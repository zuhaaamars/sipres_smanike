from flask import jsonify

from app.app import db

from app.models.master.master_siswa_models import MasterSiswa
from app.models.master.master_guru_models import MasterGuru
from app.models.master.mapel_models import Mapel
from app.models.master.master_jam_models import Jam
# kalau sudah ada jadwal:
# from app.models.master.master_jadwal_models import MasterJadwal


# =========================
# DASHBOARD SUPERADMIN
# =========================
def get_dashboard_superadmin():

    try:

        total_siswa = MasterSiswa.query.count()
        total_guru = MasterGuru.query.count()
        total_mapel = Mapel.query.count()
        total_jam = Jam.query.count()

        # kalau belum ada tabel jadwal, sementara 0 dulu
        total_jadwal = 0

        return jsonify({
            "users": total_siswa + total_guru,
            "siswa": total_siswa,
            "guru": total_guru,
            "mapel": total_mapel,
            "jam": total_jam,
            "jadwal": total_jadwal,
            "presensi": 0
        }), 200

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
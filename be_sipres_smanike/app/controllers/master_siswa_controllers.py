from flask import jsonify
from app.models.master.master_siswa import MasterSiswa


def get_all_siswa():
    try:
        data = MasterSiswa.query.all()

        output = []

        for s in data:
            output.append({
                "nis": s.nis,
                "nama": s.nama_lengkap,
                "kelas": "-"  # sementara karena belum ada relasi kelas
            })

        return jsonify({
            "status": "success",
            "data": output
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
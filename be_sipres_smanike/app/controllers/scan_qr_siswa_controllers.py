from flask import request, jsonify
from app.app import db
from app.models.presensi.scan_qr_siswa_models import PresensiSiswa
from app.models.presensi.generate_qr_guru_models import PresensiQR
from app.models.user.siswa_models import Siswa


class PresensiSiswaController:

    # =========================
    # SCAN QR (SISWA PRESENSI)
    # =========================
    @staticmethod
    def scan_qr():
        data = request.get_json()

        try:
            qr_token = data.get("qr_token")
            siswa_id = data.get("siswa_id")

            # 1. cari QR session
            presensi = PresensiQR.query.filter_by(qr_token=qr_token).first()

            if not presensi:
                return jsonify({
                    "status": "error",
                    "message": "QR tidak valid"
                }), 404

            # 2. cek apakah sudah presensi
            existing = PresensiSiswa.query.filter_by(
                presensi_id=presensi.id,
                siswa_id=siswa_id
            ).first()

            if existing:
                return jsonify({
                    "status": "error",
                    "message": "Sudah melakukan presensi"
                }), 400

            # 3. simpan presensi siswa
            new_scan = PresensiSiswa(
                presensi_id=presensi.id,
                siswa_id=siswa_id
            )

            db.session.add(new_scan)
            db.session.commit()

            return jsonify({
                "status": "success",
                "message": "Presensi berhasil",
                "data": {
                    "mapel": presensi.mapel,
                    "kelas": presensi.kelas,
                    "jam": presensi.jam,
                    "waktu_scan": new_scan.waktu_scan
                }
            }), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500


    # =========================
    # REKAP GURU
    # =========================
    @staticmethod
    def get_rekap_guru():
        try:

            data = PresensiSiswa.query.all()

            results = []

            for item in data:

                siswa = Siswa.query.get(item.siswa_id)
                presensi = PresensiQR.query.get(item.presensi_id)

                # VALIDASI
                if not siswa or not presensi:
                    continue

                results.append({
                    "id": item.id,
                    "siswa_id": siswa.id,
                    "nama": siswa.nama_lengkap,
                    "nisn": siswa.nisn,
                    "kelas": presensi.kelas,
                    "mapel": presensi.mapel,
                    "jam": presensi.jam,
                    "tanggal": presensi.waktu.strftime("%d-%m-%Y"),
                    "waktu_scan": item.waktu_scan.strftime("%H:%M:%S"),
                    "status": "Hadir"
                })

            return jsonify({
                "status": "success",
                "data": results
            }), 200

        except Exception as e:

            print("ERROR REKAP GURU :", str(e))

            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500
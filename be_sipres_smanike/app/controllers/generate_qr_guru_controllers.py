from flask import request, jsonify
from app.app import db
from app.models.presensi.generate_qr_guru_models import PresensiQR


class PresensiQRController:

    # =========================
    # GENERATE QR (GURU)
    # =========================
    @staticmethod
    def create_qr():
        data = request.get_json()

        try:
            new_qr = PresensiQR(
                mapel=data.get("mapel"),
                kelas=data.get("kelas"),
                jam=data.get("jam"),
                guru_id=data.get("guru_id")
            )

            db.session.add(new_qr)
            db.session.commit()

            return jsonify({
                "status": "success",
                "message": "QR berhasil dibuat",
                "data": new_qr.to_dict()
            }), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    # =========================
    # GET ALL QR (optional)
    # =========================
    @staticmethod
    def get_all_qr():
        data = PresensiQR.query.all()

        return jsonify({
            "status": "success",
            "data": [d.to_dict() for d in data]
        }), 200
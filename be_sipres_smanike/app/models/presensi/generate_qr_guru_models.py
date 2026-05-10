from app.app import db
from datetime import datetime
import uuid


class PresensiQR(db.Model):
    __tablename__ = 'presensiqr'

    id = db.Column(db.Integer, primary_key=True)

    # Identitas presensi
    mapel = db.Column(db.String(50), nullable=False)
    kelas = db.Column(db.String(50), nullable=False)
    jam = db.Column(db.String(20), nullable=False)

    # Guru pembuat QR
    guru_id = db.Column(db.Integer, nullable=False)

    # QR token
    qr_token = db.Column(
        db.String(255),
        unique=True,
        nullable=False,
        default=lambda: str(uuid.uuid4())
    )

    # Waktu pembuatan QR
    waktu = db.Column(db.DateTime, default=datetime.utcnow)

    # RELASI
    presensi_siswa = db.relationship(
        'PresensiSiswa',
        backref='presensi_qr',
        lazy=True,
        cascade='all, delete'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "mapel": self.mapel,
            "kelas": self.kelas,
            "jam": self.jam,
            "guru_id": self.guru_id,
            "qr_token": self.qr_token,
            "waktu": self.waktu.strftime("%Y-%m-%d %H:%M:%S")
        }
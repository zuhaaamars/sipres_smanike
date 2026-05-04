from app.app import db
from datetime import datetime

class PresensiSiswa(db.Model):
    __tablename__ = 'presensi_siswa'

    id = db.Column(db.Integer, primary_key=True)

    presensi_id = db.Column(
        db.Integer,
        db.ForeignKey('presensiqr.id', ondelete='CASCADE'),
        nullable=False
    )

    siswa_id = db.Column(
        db.Integer,
        db.ForeignKey('siswa.id', ondelete='CASCADE'),
        nullable=False
    )

    mapel = db.Column(
        db.String(100),
        nullable=False
    )

    kelas = db.Column(
        db.String(50),
        nullable=False
    )

    jam = db.Column(
        db.String(20),
        nullable=False
    )

    waktu_scan = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # biar tidak double presensi
    __table_args__ = (
        db.UniqueConstraint('presensi_id', 'siswa_id', name='unique_presensi_siswa'),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "presensi_id": self.presensi_id,
            "siswa_id": self.siswa_id,
            "mapel": self.mapel,
            "kelas": self.kelas,
            "jam": self.jam,
            "waktu_scan": self.waktu_scan.strftime("%Y-%m-%d %H:%M:%S") if self.waktu_scan else None
        }

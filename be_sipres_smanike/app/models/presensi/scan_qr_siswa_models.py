from app.app import db
from datetime import datetime


class PresensiSiswa(db.Model):
    __tablename__ = 'presensi_siswa'

    id = db.Column(db.Integer, primary_key=True)

    # Relasi ke QR session
    presensi_id = db.Column(db.Integer,db.ForeignKey('presensiqr.id', ondelete='CASCADE'),nullable=False)
    # Siswa yang scan
    siswa_id = db.Column(db.Integer,db.ForeignKey('siswa_profile.id', ondelete='CASCADE'),nullable=False)
    # Waktu siswa scan QR
    waktu_scan = db.Column(db.DateTime,default=datetime.utcnow)
    
    # Anti double presensi
    __table_args__ = (db.UniqueConstraint( 'presensi_id', 'siswa_id', name='unique_presensi_siswa'),)

    def to_dict(self):
        return {
            "id": self.id,
            "presensi_id": self.presensi_id,
            "siswa_id": self.siswa_id,
            "waktu_scan": self.waktu_scan.strftime("%Y-%m-%d %H:%M:%S") if self.waktu_scan else None
        }
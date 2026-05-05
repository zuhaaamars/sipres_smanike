from app.app import db
from datetime import time

class JadwalPelajaran(db.Model):
    __tablename__ = 'jadwal_pelajaran'

    id = db.Column(db.Integer, primary_key=True)

    # Relasi kelas (XI A, XI B, dll)
    kelas_id = db.Column(db.Integer, db.ForeignKey('master_kelas.id'), nullable=False)

    # Relasi mapel (Matematika, dll)
    mapel_id = db.Column(db.Integer, db.ForeignKey('master_mapel.id'), nullable=False)

    # Guru pengajar
    guru_id = db.Column(db.Integer, db.ForeignKey('guru_profile.id'), nullable=False)

    # Hari (Senin, Selasa, dst)
    hari = db.Column(db.String(20), nullable=False)

    # Jam pelajaran
    jam_mulai = db.Column(db.Time, nullable=False)
    jam_selesai = db.Column(db.Time, nullable=False)

    # Semester / tahun ajaran (opsional tapi bagus untuk scaling)
    semester = db.Column(db.String(10), nullable=True)
    tahun_ajaran = db.Column(db.String(20), nullable=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # ================= RELATIONSHIP =================
    kelas = db.relationship('Kelas', backref='jadwal_pelajaran', lazy=True)
    mapel = db.relationship('Mapel', backref='jadwal_pelajaran')
    guru = db.relationship('Guru', backref='jadwal_mengajar')

    def __repr__(self):
        return f"<Jadwal {self.hari} - {self.mapel_id} - {self.kelas_id}>"
from app.app import db

class MasterSiswa(db.Model):
    __tablename__ = 'master_siswa'

    nis = db.Column(db.String(20), primary_key=True)
    nama_lengkap = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "nis": self.nis,
            "nama_lengkap": self.nama_lengkap
        }
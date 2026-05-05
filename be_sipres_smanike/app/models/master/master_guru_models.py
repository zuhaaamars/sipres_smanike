from app.app import db

class MasterGuru(db.Model):
    __tablename__ = 'master_guru'

    nip = db.Column(db.String(20), primary_key=True)
    nama_lengkap = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "nip": self.nip,
            "nama_lengkap": self.nama_lengkap
        }
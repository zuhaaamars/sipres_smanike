from app.app import db

class Jam(db.Model):
    __tablename__ = 'master_jam'

    id = db.Column(db.Integer, primary_key=True)
    jam_mulai = db.Column(db.Time, nullable=True)
    jam_selesai = db.Column(db.Time, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "jam_mulai": self.jam_mulai.strftime("%H:%M") if self.jam_mulai else None,
            "jam_selesai": self.jam_selesai.strftime("%H:%M") if self.jam_selesai else None
        }
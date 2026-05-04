from app.app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='guru')
    is_active = db.Column(db.Boolean, default=True)
    
    # TAMBAHAN REVISI: Kolom Verifikasi
    is_verified = db.Column(db.Boolean, default=False) 
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# TAMBAHAN REVISI: Tabel Master Data Sekolah
class MasterSiswa(db.Model):
    __tablename__ = 'master_siswa'
    nis = db.Column(db.String(20), primary_key=True)
    nama_lengkap = db.Column(db.String(100), nullable=False)

class MasterGuru(db.Model):
    __tablename__ = 'master_guru'
    nip = db.Column(db.String(20), primary_key=True)
    nama_lengkap = db.Column(db.String(100), nullable=False)
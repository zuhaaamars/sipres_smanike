import os
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

# Import Konfigurasi dari config.py
from config import Config

# 1. Inisialisasi Plugin Secara Global
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    # LOAD CONFIG DULU
    app.config.from_object(Config)
    
    # INISIALISASI CORS DENGAN SETTINGAN LENGKAP
    CORS(app, 
         resources={r"/*": {"origins": "http://localhost:3000"}},
         supports_credentials=True,
         expose_headers=["Content-Type", "Authorization"])

    # LANJUTKAN PLUGIN LAIN
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # ... (sisanya tetap sama)

    # 5. IMPORT SEMUA MODELS
    from app.models.master.jurusan_models import Jurusan
    from app.models.master.kelas_models import Kelas
    from app.models.master.mapel_models import Mapel
    from app.models.master.jadwal_pelajaran_models import JadwalPelajaran
    from app.models.master.master_siswa_models import MasterSiswa
    from app.models.master.master_guru_models import MasterGuru
    from app.models.master.master_jam_models import Jam

    from app.models.user.user_models import User
    from app.models.user.admin_models import Admin
    from app.models.user.siswa_models import Siswa
    from app.models.user.guru_models import Guru
    from app.models.user.staff_models import Staf

    from app.models.presensi.siswa_presensi_harian_models import PresensiHarian
    from app.models.presensi.scan_qr_siswa_models import PresensiSiswa
    from app.models.presensi.generate_qr_guru_models import PresensiQR


    # 6. REGISTER BLUEPRINTS
    from app.routes.auth_routes import auth_bp
    from app.routes.presensi_routes import harian_bp, presensi_mapel_bp
    from app.routes.master.mapel_routes import mapel_bp
    from app.routes.master.Jurusan_routes import jurusan_bp
    from app.routes.master.kelas_routes import kelas_bp
    from app.routes.master_siswa_routes import siswa_bp
    from app.routes.jam_routes import jam_bp
    from app.routes.master_guru_routes import guru_bp
    from app.routes.dashboard_routes import dashboard_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(harian_bp, url_prefix="/api/presensi")
    app.register_blueprint(presensi_mapel_bp,url_prefix='/api/presensi-mapel')
    app.register_blueprint(mapel_bp, url_prefix='/api/mapel')
    app.register_blueprint(jurusan_bp, url_prefix='/api/jurusan')
    app.register_blueprint(kelas_bp, url_prefix='/api/kelas')
    app.register_blueprint(siswa_bp, url_prefix='/api/siswa')
    app.register_blueprint(jam_bp, url_prefix="/api/jam")
    app.register_blueprint(guru_bp, url_prefix='/api/guru')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')

    # 7. ROUTE DASAR
    @app.route("/")
    def home():
        return jsonify({
            "status": "success",
            "message": "Backend SIPRES SMANIKE Aktif!",
            "version": "1.0.0",
            "author": "Zuha Mars Azahra"
        })

    # STATIC FILES
    @app.route('/static/uploads/profile/<path:filename>')
    def serve_profile_images(filename):
        return send_from_directory(os.path.join(app.root_path, 'static', 'uploads', 'profile'), filename)

    @app.route('/static/uploads/presensi/<path:folder>/<path:filename>')
    def serve_presensi_images(folder, filename):

        target_path = os.path.join(
            os.getcwd(),
            'static',
            'uploads',
            'presensi',
            folder
        )

        return send_from_directory(target_path, filename)

    # 8. CUSTOM ERROR HANDLER (PENTING: Harus return JSON agar CORS tetap terbaca browser)
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "status": "error",
            "message": "Endpoint atau halaman tidak ditemukan"
        }), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "status": "error",
            "message": "Terjadi kesalahan pada server backend."
        }), 500

    return app
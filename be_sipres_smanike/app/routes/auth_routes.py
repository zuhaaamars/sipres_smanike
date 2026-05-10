from flask import Blueprint, request
from app.controllers.auth_controllers import AuthController

auth_bp = Blueprint('auth', __name__)

# Flask-CORS akan menangani OPTIONS otomatis jika methods POST didaftarkan
@auth_bp.route('/register', methods=['POST'])
def register_route():
    return AuthController.register()

@auth_bp.route('/login', methods=['POST'])
def login_route():
    return AuthController.login()

@auth_bp.route('/siswa/update', methods=['POST'])
def siswa_update():
    return AuthController.update_siswa_profile()

@auth_bp.route('/staff/update', methods=['POST'])
def staff_update():
    return AuthController.update_staff_profile()

@auth_bp.route('/guru/update', methods=['POST'])
def guru_update():
    return AuthController.update_guru_profile()

# Tambahkan baris ini di auth_routes.py
@auth_bp.route('/pending-users', methods=['GET'])
def pending_users():
    return AuthController.get_all_pending_users() # Sesuaikan nama fungsinya

@auth_bp.route('/verify/<int:user_id>', methods=['POST'])
def verify(user_id):
    return AuthController.verify_user(user_id)

# Di auth_routes.py
@auth_bp.route('/approve/<int:user_id>', methods=['PUT']) # Samakan dengan React
def approve_user(user_id):
    return AuthController.verify_user(user_id)

@auth_bp.route('/users', methods=['GET'])
def get_users():
    return AuthController.get_all_users()

@auth_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return AuthController.delete_user(user_id)

@auth_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    return AuthController.update_user(user_id)
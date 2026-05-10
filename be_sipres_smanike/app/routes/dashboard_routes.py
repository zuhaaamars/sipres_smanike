from flask import Blueprint
from app.controllers.Dashboard.superadmin_dashboard_controllers import get_dashboard_superadmin

dashboard_bp = Blueprint(
    'dashboard_bp',
    __name__,
    url_prefix='/api/dashboard'
)

# Dashboard superadmin
@dashboard_bp.route('', methods=['GET'])
def dashboard_superadmin():
    return get_dashboard_superadmin()
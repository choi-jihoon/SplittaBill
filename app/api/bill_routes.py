from flask import Blueprint
from flask_login import current_user

from app.models import Bill




bill_routes = Blueprint('bills', __name__)

@bill_routes.route('/')
def get_bills():
    all_bills = Bill.query.filter(Bill.owner_id == current_user.get_id()).all()
    all_bills_list = [bill.to_dict() for bill in all_bills]

    return {"all_bills": all_bills_list}

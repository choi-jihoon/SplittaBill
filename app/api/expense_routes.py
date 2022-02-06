from flask import Blueprint
from flask_login import current_user
from app.models import Expense

expense_routes = Blueprint('expenses', __name__)


@expense_routes.route('/')
def get_expenses():
    curr_user_id = current_user.get_id()
    user_expenses = Expense.query.filter(Expense.payer_id == curr_user_id).all()
    return {"expenses": [expense.to_dict() for expense in user_expenses if int(expense.bill.owner_id) != int(curr_user_id)]}

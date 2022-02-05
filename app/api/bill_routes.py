from flask import Blueprint, request
from flask_login import current_user

from app.models import Bill, db
from app.forms import AddBillForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


bill_routes = Blueprint('bills', __name__)

@bill_routes.route('/')
def get_bills():
    all_bills = Bill.query.filter(Bill.owner_id == current_user.get_id()).all()
    all_bills_list = [bill.to_dict() for bill in all_bills]

    return {"all_bills": all_bills_list}


@bill_routes.route('/', methods=['POST'])
def add_bill():
    form = AddBillForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    friends = form['friends'].data
    print(friends)

    if form.validate_on_submit():
        bill = Bill(
            owner_id = current_user.get_id(),
            total_amount = form.data['total_amount'],
            description = form.data['description'],
            deadline=form.data['deadline']
        )
        db.session.add(bill)
        db.session.commit()
        return bill.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

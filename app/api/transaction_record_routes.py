from flask import Blueprint, request
from flask_login import current_user
from app.models import db, TransactionRecord
from app.forms import TransactionForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

transaction_record_routes = Blueprint('transaction_records', __name__)

@transaction_record_routes.route('/', methods=['POST'])
def create_transaction():
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    curr_user_id = current_user.get_id()

    if form.validate_on_submit():

        transaction_record = TransactionRecord(
            payer_id = curr_user_id,
            recipient_id = form.data['recipient_id'],
            expense_id = form.data['expense_id'],
            amount_paid = form.data['amount_paid']
        )

        db.session.add(transaction_record)
        db.session.commit()

        return {'transaction_record': transaction_record.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

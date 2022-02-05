from flask import Blueprint, request
from flask_login import current_user

from app.models import db, Bill, Expense, Friend, User
from app.forms import AddBillForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            # errorMessages.append(f'{field} : {error}')
            errorMessages.append(f'{error}')
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
    friends_list = friends.split(", ")

    curr_user_id = current_user.get_id()

    if form.validate_on_submit():
        data = {}

        bill = Bill(
            owner_id = curr_user_id,
            total_amount = form.data['total_amount'],
            description = form.data['description'],
            deadline=form.data['deadline']
        )

        db.session.add(bill)
        db.session.commit()


        def get_friend_id(friend):
            user = User.query.filter(User.username == friend).first()
            return user.id

        all_friend_ids = list(map(get_friend_id, friends_list))

        divvyed_expense = form.data['total_amount'] / (len(all_friend_ids) + 1)

        user_expense = Expense(
            payer_id = curr_user_id,
            bill_id = bill.id,
            initial_charge = divvyed_expense,
            amount_due = 0,
            settled = True
        )

        db.session.add(user_expense)
        db.session.commit()
        # data["expenses"] = [user_expense.to_dict()]

        for friend_id in all_friend_ids:
            new_expense = Expense(
                payer_id = friend_id,
                bill_id = bill.id,
                initial_charge = divvyed_expense
            )
            db.session.add(new_expense)
            db.session.commit()
            # data["expenses"].append(new_expense.to_dict())


        data["bill"] = bill.to_dict()

        db.session.commit()

        return data

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@bill_routes.route('/<int:billId>', methods=["DELETE"])
def deleteBill(billId):
    data = {}
    bill = Bill.query.get(int(billId))
    data["bill"] = bill.to_dict()
    data["expenses"] = [expense.to_dict() for expense in bill.expenses]
    db.session.delete(bill)
    db.session.commit()
    return data

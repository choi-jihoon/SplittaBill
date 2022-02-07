from flask import Blueprint, request
from flask_login import current_user
from decimal import Decimal

from app.models import db, Bill, Expense, Friend, User
from app.forms import BillForm

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


def get_friend_id(friend):
    user = User.query.filter(User.username == friend).first()
    return user.id


bill_routes = Blueprint('bills', __name__)

@bill_routes.route('/')
def get_bills():
    all_bills = Bill.query.filter(Bill.owner_id == current_user.get_id()).all()
    all_bills_list = [bill.to_dict() for bill in all_bills]

    return {"all_bills": all_bills_list}


@bill_routes.route('/<int:billId>/expenses')
def get_expenses_for_bill(billId):
    bill = Bill.query.filter(Bill.id == billId).first()
    expenses = bill.expenses
    return {"expenses": [expense.to_dict() for expense in expenses], "billId": billId}


@bill_routes.route('/', methods=['POST'])
def add_bill():
    form = BillForm()
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

        for friend_id in all_friend_ids:
            new_expense = Expense(
                payer_id = friend_id,
                bill_id = bill.id,
                initial_charge = divvyed_expense
            )
            db.session.add(new_expense)
            db.session.commit()

            friend1 = Friend.query.filter(Friend.user_id == bill.owner_id, Friend.friend_id == new_expense.payer_id).first()
            friend2 = Friend.query.filter(Friend.user_id == new_expense.payer_id, Friend.friend_id == bill.owner_id).first()

            friend1.balance += new_expense.initial_charge
            friend2.balance -= new_expense.initial_charge
            db.session.commit()


        data["bill"] = bill.to_dict()

        db.session.commit()

        return data

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@bill_routes.route('/<int:billId>', methods=["DELETE"])
def deleteBill(billId):
    data = {}
    bill = Bill.query.get(int(billId))
    data["bill"] = bill.to_dict()
    expenses_to_update_balances = data["bill"]["expenses"]

    for expense in expenses_to_update_balances:
        if bill.owner_id == expense["payer_id"]:
            continue
        friend1 = Friend.query.filter(Friend.user_id == bill.owner_id, Friend.friend_id == expense["payer_id"]).first()
        friend2 = Friend.query.filter(Friend.user_id == expense["payer_id"], Friend.friend_id == bill.owner_id).first()

        friend1.balance -= Decimal(expense["initial_charge"])
        friend2.balance += Decimal(expense["initial_charge"])
        db.session.commit()


    db.session.delete(bill)
    db.session.commit()
    return data


@bill_routes.route('/<int:billId>', methods=["PUT"])
def editBill(billId):
    form = BillForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    friends = form['friends'].data
    friends_list = friends.split(", ")

    curr_user_id = current_user.get_id()

    if form.validate_on_submit():
        data = {}
        bill = Bill.query.get(int(billId))

        bill.total_amount = form.data["total_amount"]
        bill.description = form.data["description"]
        bill.deadline = form.data["deadline"]

        db.session.commit()

        all_friend_ids = list(map(get_friend_id, friends_list))
        divvyed_expense = form.data['total_amount'] / (len(all_friend_ids) + 1)

        user_expense = Expense.query.filter(Expense.bill_id == bill.id, Expense.payer_id == curr_user_id).first()
        user_expense.initial_charge = divvyed_expense
        db.session.commit()

        for friend_id in all_friend_ids:
            friend_expense = Expense.query.filter(Expense.payer_id == friend_id, Expense.bill_id == bill.id).first()
            if friend_expense:
                prev_initial_charge = friend_expense.initial_charge

                friend_expense.initial_charge = divvyed_expense


                friend1 = Friend.query.filter(Friend.user_id == bill.owner_id, Friend.friend_id == friend_expense.payer_id).first()
                friend2 = Friend.query.filter(Friend.user_id == friend_expense.payer_id, Friend.friend_id == bill.owner_id).first()

                diff = divvyed_expense - prev_initial_charge

                friend1.balance += diff
                friend2.balance -= diff

                friend_expense.amount_due += diff

                db.session.commit()

            else:
                new_expense = Expense(
                    payer_id = friend_id,
                    bill_id = bill.id,
                    initial_charge = divvyed_expense
                )
                db.session.add(new_expense)
                db.session.commit()

                friend1 = Friend.query.filter(Friend.user_id == bill.owner_id, Friend.friend_id == new_expense.payer_id).first()
                friend2 = Friend.query.filter(Friend.user_id == new_expense.payer_id, Friend.friend_id == bill.owner_id).first()

                friend1.balance += new_expense.initial_charge
                friend2.balance -= new_expense.initial_charge
                db.session.commit()



        for friend_id in all_friend_ids:
            expense_to_remove = Expense.query.filter(Expense.bill_id == bill.id, Expense.payer_id != friend_id).first()
            if expense_to_remove and bill.owner_id != expense_to_remove.payer_id:
                friend1 = Friend.query.filter(Friend.user_id == bill.owner_id, Friend.friend_id == expense_to_remove.payer_id).first()
                friend2 = Friend.query.filter(Friend.user_id == expense_to_remove.payer_id, Friend.friend_id == bill.owner_id).first()

                friend1.balance -= Decimal(expense_to_remove.initial_charge)
                friend2.balance += Decimal(expense_to_remove.initial_charge)
                db.session.delete(expense_to_remove)
                db.session.commit()

        db.session.commit()
        data["bill"] = bill.to_dict()
        return data

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

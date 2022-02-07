from app.models import db, Bill, Expense, Friend, Comment

def seed_bills():
    bill1 = Bill(owner_id=1, total_amount=75, description="Groceries")
    bill2 = Bill(owner_id=4, total_amount=2000, description="Rent")

    expense11 = Expense(payer_id=1, bill_id=1, initial_charge=25, amount_due=0, settled=True)
    expense12 = Expense(payer_id=2, bill_id=1, initial_charge=25)
    expense13 = Expense(payer_id=3, bill_id=1, initial_charge=25)

    friend12 = Friend.query.get(1)
    friend12.balance = 25
    friend21 = Friend.query.get(2)
    friend21.balance = -25

    friend13 = Friend.query.get(3)
    friend13.balance = 25
    friend31 = Friend.query.get(4)
    friend31.balance = -25

    expense24 = Expense(payer_id=4, bill_id=2, initial_charge=500, amount_due=0, settled=True)
    expense21 = Expense(payer_id=1, bill_id=2, initial_charge=500)
    expense22 = Expense(payer_id=2, bill_id=2, initial_charge=500)
    expense23 = Expense(payer_id=3, bill_id=2, initial_charge=500)

    friend41 = Friend.query.get(6)
    friend41.balance = 500
    friend14 = Friend.query.get(5)
    friend14.balance = -500

    friend42 = Friend.query.get(7)
    friend42.balance = 500
    friend24 = Friend.query.get(8)
    friend24.balance = -500

    friend43 = Friend.query.get(9)
    friend43.balance = 500
    friend34 = Friend.query.get(10)
    friend34.balance = -500



    comment1 = Comment(user_id=1, bill_id=1, message="Pay me back NICK!")

    db.session.add(bill1)
    db.session.add(expense11)
    db.session.add(expense12)
    db.session.add(expense13)
    db.session.add(comment1)

    db.session.add(bill2)
    db.session.add(expense24)
    db.session.add(expense21)
    db.session.add(expense22)
    db.session.add(expense23)

    db.session.commit()

def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE;')
    db.session.commit()

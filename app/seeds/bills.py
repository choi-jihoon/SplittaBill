from app.models import db, Bill, Expense, Friend, Comment

def seed_bills():
    bill1 = Bill(owner_id=1, total_amount=75, description="Groceries", deadline="2022-03-11")
    bill2 = Bill(owner_id=4, total_amount=2000, description="Rent", deadline="2022-03-01")
    bill3 = Bill(owner_id=3, total_amount=93, description="Wifi", deadline="2040-10-31")

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

    expense33 = Expense(payer_id=3, bill_id=3, initial_charge=21, amount_due=0, settled=True)
    expense31 = Expense(payer_id=1, bill_id=3, initial_charge=21)
    expense32 = Expense(payer_id=2, bill_id=3, initial_charge=21)

    friend31 = Friend.query.get(4)
    friend31.balance = -4
    friend13 = Friend.query.get(3)
    friend13.balance = 4

    friend32 = Friend.query.get(12)
    friend32.balance = 21
    friend23 = Friend.query.get(11)
    friend23.balance = -21


    comment1 = Comment(user_id=3, bill_id=3, message="Pay me back NICK!")
    comment2 = Comment(user_id=2, bill_id=3, message="I REFUSE TO PAY FOR THE WEEFEE")
    comment3 = Comment(user_id=3, bill_id=3, message="You need to make a bank account!!")
    comment4 = Comment(user_id=2, bill_id=3, message="a bank is just a paper bag but with fancier walls")
    comment5 = Comment(user_id=4, bill_id=2, message="Nick, I love you, but I can't keep paying for you.")
    comment6 = Comment(user_id=2, bill_id=2, message="what is money anyway?")
    comment7 = Comment(user_id=2, bill_id=2, message="it's just paper that some king on a mountain said was worth something")
    comment8 = Comment(user_id=3, bill_id=1, message="Did you get pretzels?")

    db.session.add(bill1)
    db.session.add(expense11)
    db.session.add(expense12)
    db.session.add(expense13)

    db.session.add(bill2)
    db.session.add(expense24)
    db.session.add(expense21)
    db.session.add(expense22)
    db.session.add(expense23)

    db.session.add(bill3)
    db.session.add(expense33)
    db.session.add(expense31)
    db.session.add(expense32)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)

    db.session.commit()

def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE;')
    db.session.commit()

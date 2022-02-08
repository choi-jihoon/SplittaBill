from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demouser = User(
        username='Demouser', email='demo@aa.io', password='password', image="http://splitabill.s3.amazonaws.com/8929d513ddd9492583b11e68e393cc3b.png")
    nick = User(
        username='NickMiller', email='nick@aa.io', password='password', image="http://splitabill.s3.amazonaws.com/15931ab9d8db4854bcc8c8f0040b056e.png")
    jess = User(
        username='JessDay', email='jess@aa.io', password='password', image="http://splitabill.s3.amazonaws.com/14bcd10c542d4039933902a4d4630822.jpeg")
    schmidt = User(
        username='Schmidtty', email='schmidt@aa.io', password='password', image="http://splitabill.s3.amazonaws.com/fbc312e8745f4351a3f956f2c28ecd87.jpeg")
    winston = User(
        username='WinnieTheBish', email='winston@aa.io', password='password', image="http://splitabill.s3.amazonaws.com/50b1bea4425b4720a19b3bbd9e901e3b.jpeg")
    coach = User(
        username='Coach', email='coach@aa.io', password='password', image="http://splitabill.s3.amazonaws.com/3c8b6373330846379292004dc853faa5.jpg")

    db.session.add(demouser)
    db.session.add(nick)
    db.session.add(jess)
    db.session.add(schmidt)
    db.session.add(winston)
    db.session.add(coach)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

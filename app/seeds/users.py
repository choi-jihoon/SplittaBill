from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demouser = User(
        username='Demouser', email='demo@aa.io', password='password')
    nick = User(
        username='NickMiller', email='nick@aa.io', password='password')
    jess = User(
        username='JessDay', email='jess@aa.io', password='password')
    schmidt = User(
        username='Schmidtty', email='schmidt@aa.io', password='password')
    winston = User(
        username='WinnieTheBish', email='winston@aa.io', password='password')
    coach = User(
        username='Coach', email='coach@aa.io', password='password')

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

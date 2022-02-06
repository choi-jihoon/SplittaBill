from app.models import db, Friend

def seed_friends():
    friend12 = Friend(user_id=1, friend_id=2)
    friend21 = Friend(user_id=2, friend_id=1)

    friend13 = Friend(user_id=1, friend_id=3)
    friend31 = Friend(user_id=3, friend_id=1)

    friend14 = Friend(user_id=1, friend_id=4)
    friend41 = Friend(user_id=4, friend_id=1)

    friend42 = Friend(user_id=4, friend_id=2)
    friend24 = Friend(user_id=2, friend_id=4)

    friend43 = Friend(user_id=4, friend_id=3)
    friend34 = Friend(user_id=3, friend_id=4)


    db.session.add(friend12)
    db.session.add(friend21)
    db.session.add(friend13)
    db.session.add(friend31)
    db.session.add(friend14)
    db.session.add(friend41)
    db.session.add(friend42)
    db.session.add(friend24)
    db.session.add(friend43)
    db.session.add(friend34)

    db.session.commit()

def undo_friends():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()

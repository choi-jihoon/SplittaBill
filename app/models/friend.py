from .db import db


class Friend(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    balance = db.Column(db.Numeric(10,2), default=0)

    user = db.relationship("User", foreign_keys=[user_id])
    friend = db.relationship("User", foreign_keys=[friend_id])

    def to_dict(self):
        return {
            "friend_name": self.friend.username,
            "balance": float(self.balance)
        }

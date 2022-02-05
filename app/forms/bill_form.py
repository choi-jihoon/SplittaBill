from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import User, Friend


def get_friend_id(friend):
    user = User.query.filter(User.username == friend).first()
    if user:
        return user.id
    else:
        return 0

def check_friend_ids(form, field):
    friends = field.data
    user_id = form.data['owner_id']
    friends_list = friends.split(", ")
    all_friend_ids = list(map(get_friend_id, friends_list))

    if 0 in all_friend_ids:
        raise ValidationError("Friend does not exist.")

    for friend_id in all_friend_ids:
        is_friend = Friend.query.filter(Friend.user_id == user_id, Friend.friend_id == friend_id).first()
        if not is_friend:
            raise ValidationError("That user is not your friend.")

class AddBillForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    total_amount = DecimalField('total_amount', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    deadline = DateField('deadline')
    friends = StringField('friends', validators=[DataRequired(), check_friend_ids])

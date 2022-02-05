from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, DateField
from wtforms.validators import DataRequired

class AddBillForm(FlaskForm):
    owner_id = IntegerField('owner_id')
    total_amount = DecimalField('total_amount', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    deadline = DateField('deadline')
    friends = StringField('friends', validators=[DataRequired()])

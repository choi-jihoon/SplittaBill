from flask_wtf import FlaskForm
from wtforms import DecimalField, IntegerField
from wtforms.validators import DataRequired

class TransactionForm(FlaskForm):
    amount_paid = DecimalField('amount_paid', validators=[DataRequired()])
    recipient_id = IntegerField('recipient_id')
    expense_id = IntegerField('expense_id')

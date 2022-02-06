from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, DateField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    message = TextAreaField("message", validators=[DataRequired()])

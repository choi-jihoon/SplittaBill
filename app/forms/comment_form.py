from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired, ValidationError

def check_comment_length(form, field):
    message = field.data
    if len(message) > 280:
        raise ValidationError("Comment must be less than 280 characters.")

class CommentForm(FlaskForm):
    message = TextAreaField("message", validators=[DataRequired(), check_comment_length])

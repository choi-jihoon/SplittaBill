from flask import Blueprint
from app.models import db, User, Friend
from flask_login import current_user, login_required

friend_routes = Blueprint('friend', __name__)

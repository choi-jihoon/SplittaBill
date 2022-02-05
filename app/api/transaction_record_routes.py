from flask import Blueprint
from flask_login import current_user
from app.models import db, TransactionRecord

transaction_record_routes = Blueprint('transaction_records', __name__)

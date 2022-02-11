from flask import Blueprint, request, jsonify
from flask_login import current_user
import json
import os
import stripe

stripe.api_key = 'sk_test_51KRnp0AiyFrcDvqiTv0CZaJAsqv1eOQQdUr8POQp9BIQ7nGT6ZMfZTY5VUPUkU6PLvYF90Y2bGVoXcTkGlKvMKhA006GkNCSCv'

stripe_routes = Blueprint('stripe', __name__)

@stripe_routes.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount= int(float(data['amount']) * 100),
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 403

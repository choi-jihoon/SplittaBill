state = {
    session: {
        user: {
            username,
            email,
            hashed_password
        }
    },
    friends: {
        byId: {
            friendId1: {
                id,
                user_id,
                friend_id,
                balance
            }, ...
        },
        allIds: [friendId1, friendId2, ...]
    },
    bills: {
        byId: {
            billId1: {
                id,
                owner_id,
                total_amount,
                description,
                deadline,
                expenses = [expenseId1, expenseId2, ...],
                comments = [commentId1, commentId2, ...]
            }, ...
        },
        allIds: [billId1, billId2, ...]
    },
    expenses: {
        byId: {
            expenseId1: {
                id,
                payer_id,
                bill_id,
                initial_charge,
                amount_due,
                settled,
                transaction_records = [transactionId1, transactionId2, ...]
            }, ...
        },
        allIds: [expenseId1, expenseId2, ...]
    },
    comments: {
        commentId1: {
            id,
            user_id,
            bill_id,
            message
        }, ...
    },
    transaction_records: {
        byId: {
            transaction_recordId1: {
                id,
                payer_id,
                recipient_id,
                expense_id,
                amount_paid
            }, ...
        },
        allIds: [transaction_recordId1, transaction_recordId2, ...]
    }
}

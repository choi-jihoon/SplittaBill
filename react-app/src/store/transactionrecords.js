const CREATE = 'transactions/ADD';

const create = (data) => ({
    type: CREATE,
    data
})

export const addTransactionRecord = (recipient_id, expense_id, amount_paid) => async (dispatch) => {
    const response = await fetch(`/api/transaction_records/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            recipient_id,
            expense_id,
            amount_paid
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors)
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}


const initialState = {}

const transactionRecords = (state = initialState, action) => {
    switch (action.type) {
        case CREATE: {
            const newState = {
                ...state,
                [action.data.transaction_record.id]: action.data.transaction_record
            }
            return newState;
        }

        default:
            return state
    }
}

export default transactionRecords;

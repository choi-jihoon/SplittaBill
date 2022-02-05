
const LOAD = 'bills/LOAD';
const CREATE = 'bills/ADD';
const DELETE = 'bills/DELETE';
const EDIT = 'bills/EDIT'

const load = (bills) => ({
    type: LOAD,
    bills
})

const create = (data) => ({
    type: CREATE,
    data
})

const remove = (data) => ({
    type: DELETE,
    data
})

const edit = (data) => ({
    type: EDIT,
    data
})

export const getBills = () => async (dispatch) => {
    const response = await fetch(`/api/bills/`);

    if (response.ok) {
        const bills = await response.json()
        dispatch(load(bills.all_bills))
    } else {
        const errors = await response.json()
        console.log(errors.errors);
    }
}

export const createBill = (owner_id, total_amount, description, deadline, friends) => async (dispatch) => {
    const response = await fetch(`/api/bills/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner_id,
            total_amount,
            description,
            deadline,
            friends
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

export const deleteBill = (billId) => async (dispatch) => {
    const response = await fetch(`/api/bills/${billId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(remove(data))
        return null
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

export const editBill = (billId, owner_id, total_amount, description, deadline, friends) => async (dispatch) => {
    const response = await fetch(`/api/bills/${billId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner_id,
            total_amount,
            description,
            deadline,
            friends
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(edit(data));
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


const initialState = {
    bills: {}
}


const billsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const loadBills = {}
            action.bills.forEach(bill => {
                loadBills[bill.id] = bill
            });
            return {
                ...state,
                bills: {
                    ...loadBills
                }
            }
        }

        case CREATE: {

            const newState = {
                ...state,
                bills: {
                    ...state.bills,
                    [action.data.bill.id]: action.data.bill
                }
            };
            return newState;
        }

        case DELETE: {
            const newState = { ...state };
            delete newState.bills[action.data.bill.id];

            return newState;
        }

        case EDIT: {
            const newState = { ...state };
            newState.bills[action.data.bill.id] = action.data.bill;
            return newState;
        }

        default:
            return state
    }
}

export default billsReducer;

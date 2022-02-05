
const LOAD = 'bills/LOAD';
const CREATE = 'bills/ADD';
const DELETE = 'bills/DELETE';
const EDIT = 'bills/EDIT'
const LOAD_EXPENSES = 'bills/LOAD_EXPENSES'
const EXPENSES_FOR_ONE_BILL = 'bills/EXPENSES_FOR_ONE_BILL'

const CREATE_TRANSACTION = 'bills/CREATE_TRANSACTION'
const LOAD_TRANSACTIONS = 'bills/LOAD_TRANSACTIONS'

const loadTransactions = (data) => ({
    type: LOAD_TRANSACTIONS,
    data
})

const createTransaction = (data) => ({
    type: CREATE_TRANSACTION,
    data
})

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

const load_user_expenses = (data) => ({
    type: LOAD_EXPENSES,
    data
})

const load_expenses_for_one_bill = (data) => ({
    type: EXPENSES_FOR_ONE_BILL,
    data
})

export const getTransactionRecords = () => async (dispatch) => {
    const response = await fetch(`/api/transaction_records/`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadTransactions(data.transaction_records))
    } else {
        const errors = await response.json()
        console.log(errors.errors);
    }
}

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
        dispatch(createTransaction(data));
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

export const getUserExpenses = () => async (dispatch) => {
    const response = await fetch(`/api/expenses/`);
    if (response.ok) {
        const user_expenses = await response.json()
        dispatch(load_user_expenses(user_expenses.expenses))
    } else {
        const errors = await response.json()
        console.log(errors.errors);
    }
}

export const getExpensesForBill = (billId) => async (dispatch) => {
    const response = await fetch(`/api/bills/${billId}/expenses`);
    if (response.ok) {
        const data = await response.json()
        dispatch(load_expenses_for_one_bill(data))
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
    bills: {},
    expenses: {},
    expenses_by_bill: {},
    transaction_records: {}
}


const bills = (state = initialState, action) => {
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

        case LOAD_EXPENSES: {
            const loadExpenses = {}
            action.data.forEach(expense => {
                loadExpenses[expense.id] = expense
            });
            return {
                ...state,
                expenses: {
                    ...loadExpenses
                }
            }
        }

        case EXPENSES_FOR_ONE_BILL: {
            const loadExpenses = {}
            action.data.expenses.forEach(expense => {
                loadExpenses[expense.id] = expense
            });
            return {
                ...state,
                expenses_by_bill: {
                    ...loadExpenses
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

        case LOAD_TRANSACTIONS: {
            const loadRecords = {}
            action.data.forEach(record => {
                loadRecords[record.id] = record
            });
            return {
                ...state,
                transaction_records: {
                    ...state.transaction_records,
                    ...loadRecords
                }
            }
        }

        case CREATE_TRANSACTION: {
            const newState = { ...state };
            newState.transaction_records = {
                ...newState.transaction_records,
                [action.data.transaction_record.id]: action.data.transaction_record
            }
            newState.expenses[action.data.expense_to_update.id] = action.data.expense_to_update;
            return newState;
        }

        default:
            return state
    }
}

export default bills;
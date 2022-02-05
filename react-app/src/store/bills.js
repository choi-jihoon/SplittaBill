const LOAD = 'bills/LOAD';

const load = (bills) => ({
    type: LOAD,
    bills
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


const initialState = {}


const billsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const loadBills = {}
            action.bills.forEach(bill => {
                loadBills[bill.id] = bill
            });
            return {
                ...state,
                ...loadBills
            }
        }

        default:
            return state
    }
}

export default billsReducer;

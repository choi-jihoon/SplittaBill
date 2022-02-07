import { useSelector } from 'react-redux';

import SettleUpModal from '../SettleUp/SettleUpModal';
import ExpenseBillDetailsModal from '.';


const ExpenseDetail = ({ expense }) => {

    const sessionUser = useSelector(state => state.session.user);


    return (
        <div>
            <h3>{expense.bill.description} Expense for {expense.payer_name}</h3>
            <ul>
                <li>
                    INITIAL CHARGE: {expense.initial_charge}
                </li>
                <li>
                    AMOUNT DUE: {expense.amount_due}
                </li>
                <li>
                    SETTLED?: {expense.settled ? <i className="fas fa-check settled-true"></i> : <i className="fas fa-times settled-false"></i>}
                </li>
                {(!expense.settled && expense.payer_id === sessionUser.id) &&
                    <SettleUpModal expense={expense} />
                }
                {(expense.bill.owner_id !== sessionUser.id) &&
                    (
                        <>
                            <li>
                                PAY TO: {expense.bill.owner_name}
                            </li>
                            <li>
                                <ExpenseBillDetailsModal expense={expense} />
                            </li>
                        </>
                    )
                }
            </ul>

        </div>
    )
}

export default ExpenseDetail;

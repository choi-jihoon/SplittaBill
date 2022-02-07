import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import SettleUpModal from './SettleUp/SettleUpModal';
import ExpenseBillDetailsModal from './ExpenseBillDetailsModal';


const ExpenseDetail = ({ expense }) => {
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);

    const checkLocation = () => {
        if (location.pathname === '/') {
            return true;
        }
        return false;
    }

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
                {(checkLocation() && expense.bill.owner_id !== sessionUser.id) &&
                    (
                        <>
                            <li>
                                PAY TO: {expense.bill.owner_name}
                            </li>
                            <li>
                                {/* <Link to={`/expenses/${expense.id}/bill`}>
                                    See Bill Details
                                </Link> */}
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

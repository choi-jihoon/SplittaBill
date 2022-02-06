import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import SettleUpModal from './SettleUp/SettleUpModal';


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
            <h3>Expense Detail</h3>
            <ul>
                <li>
                    PAYER: { expense.payer_name }
                </li>
                <li>
                    INITIAL CHARGE: { expense.initial_charge }
                </li>
                <li>
                    AMOUNT DUE: { expense.amount_due }
                </li>
                <li>
                    SETTLED?: {expense.settled ? "YES" : "NO"}
                </li>
                {(checkLocation() && expense.bill.owner_id !== sessionUser.id) &&
                (
                    <>
                        <li>
                            PAY TO: { expense.bill.owner_name }
                        </li>
                        <li>
                            FOR: { expense.bill.description }
                        </li>
                        <li>
                            <Link to={`/expenses/${expense.id}/bill`}>
                                See Bill Details
                            </Link>
                        </li>
                        { !expense.settled &&
                            <SettleUpModal expense={expense} />
                        }
                    </>
                )
                }
            </ul>

        </div>
    )
}

export default ExpenseDetail;

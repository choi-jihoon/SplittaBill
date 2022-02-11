import { useSelector } from 'react-redux';

import SettleUpModal from '../../SettleUpModal';

import "./BillDetailsExpenses.css";


const BillDetailsExpenses = ({ expense }) => {

    const sessionUser = useSelector(state => state.session.user);

    const image = expense.payer_image;

    const amount_paid = (expense.initial_charge - expense.amount_due);


    return (
        <div className='bde-container'>
            <div className='bde-settle-up-modal-btn'>
                {(!expense.settled && expense.payer_id === sessionUser.id) &&
                    <SettleUpModal expense={expense} />
                }
            </div>
            <div className='bde-expense-payment-container'>
                <div className="bde-pic-payer-name-container">
                    <div className="bill-expense-profile-pic" id="bill-detail-expense-profile-pic">
                        <img src={image} className="profile-pic bill-profile-pic" alt={`${expense.payer_name} profile`} ></img>
                    </div>
                    <div className='bde-payer-name bold'>
                        {expense.payer_name}
                    </div>
                </div>
                <div className='bde-payment-settled-info'>
                    <div className={expense.settled ? 'bde-paid-text' : 'bde-paid-text bde-not-paid'}>
                        paid {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount_paid)} out of {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expense.initial_charge)}
                    </div>
                    <div className='bde-settled-true-or-false'>
                        {expense.settled ? <i className="fas fa-check bde-settled-true"></i> : <i className="fas fa-times bde-settled-false"></i>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetailsExpenses;

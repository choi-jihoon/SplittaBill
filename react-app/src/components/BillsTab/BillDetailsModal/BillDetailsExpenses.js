import { useSelector } from 'react-redux';

import SettleUpModal from '../SettleUp/SettleUpModal';

import "./BillDetailsExpenses.css";


const BillDetailsExpenses = ({ expense }) => {

    const sessionUser = useSelector(state => state.session.user);

    const image = expense.payer_image ? expense.payer_image : "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

    return (
        <div className='bde-container'>
            <div className='bde-settle-up-modal-btn'>
                {(!expense.settled && expense.payer_id === sessionUser.id) &&
                    <SettleUpModal expense={expense} />
                }
            </div>
            <div className='bde-expense-payment-container'>
                <div className="bde-pic-payer-name-container">
                    <div className="profile-pic-div" id="bill-detail-expense-profile-pic">
                        <img src={image} className="profile-pic" ></img>
                    </div>
                    <div className='bde-payer-name bold'>
                        {expense.payer_name}
                    </div>
                </div>
                <div className='bde-payment-settled-info'>
                    <div className='bde-paid-text'>
                        paid ${expense.initial_charge - expense.amount_due} out of ${expense.initial_charge}
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

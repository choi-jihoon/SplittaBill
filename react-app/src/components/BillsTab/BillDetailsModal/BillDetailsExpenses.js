import { useSelector } from 'react-redux';

import SettleUpModal from '../SettleUp/SettleUpModal';

import "./BillDetailsExpenses.css";


const BillDetailsExpenses = ({ expense }) => {

    const sessionUser = useSelector(state => state.session.user);

    const image = expense.bill.owner_image ? expense.bill.owner_image : "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

    return (
        <div>

            <div>
                {(!expense.settled && expense.payer_id === sessionUser.id) &&
                    <SettleUpModal expense={expense} />
                }
            </div>

            <div>
                <div>
                    <div>
                        <div className="bde-pic-payername-container">
                            <div className="profile-pic-div" id="bill-detail-expense-profile-pic">
                                <img src={image} className="profile-pic" ></img>
                            </div>
                            <div className='bill-detail-expense-payer-name'>
                                {expense.payer_name}
                            </div>
                        </div>
                    </div>
                    <div>
                        paid ${expense.initial_charge - expense.amount_due} out of ${expense.initial_charge}
                        <span>
                        {expense.settled ? <i className="fas fa-check settled-true"></i> : <i className="fas fa-times settled-false"></i>}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetailsExpenses;

import { useSelector } from 'react-redux';
import { useState } from "react";
import { Modal } from '../../../context/Modal';
import ExpenseBillDetails from './ExpenseBillDetails';

import SettleUpModal from '../SettleUp/SettleUpModal';



const ExpenseDetail = ({ expense }) => {
    const [showModal, setShowModal] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    const image = expense.bill.owner_image ? expense.bill.owner_image : "https://splitabill.s3.us-east-2.amazonaws.com/f395dfcdb332496bb5700cc328339e5d.png";

    return (
        <div className='bill-container-and-buttons'>

            <div className='settle-up-container'>
                {(!expense.settled && expense.payer_id === sessionUser.id) &&
                    <SettleUpModal expense={expense} />
                }
            </div>

            <div className='bill-container' onClick={() => setShowModal(true)}>
                <div className='bill-info-container'>
                    <div className='bill-left-side'>
                        <div className="profile-pic-div bill-pic-div">
                            <img src={image} className="profile-pic" ></img>
                        </div>
                        <div className='bill-owner-description-container'>
                            <div className='bill-owner-name'>
                                You owe {expense.bill.owner_name} for
                            </div>
                            <h2 className='bill-description'>
                                <span className='invoice-icon'><i className="fas fa-receipt"></i></span>
                                {expense.bill.description} Expense
                                <span>
                                {expense.settled ? <i className="fas fa-check settled-true"></i> : <i className="fas fa-times settled-false"></i>}
                                </span>
                            </h2>
                        </div>
                    </div>
                    <div className='bill-total-amount'>
                        {expense.settled ? "" : "-"}
                        ${expense.amount_due}
                    </div>
                </div>
            </div>



            <div>
				{(showModal) && (
					<Modal onClose={() => setShowModal(false)}>
						<ExpenseBillDetails showModal={setShowModal} expense={expense} />
					</Modal>
				)}
			</div>
        </div>
    )
}

export default ExpenseDetail;

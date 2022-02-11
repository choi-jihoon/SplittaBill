import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBill, getUserBalance } from "../../../../../../store/bills";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './DeleteBillForm.css'

toast.configure()


function DeleteBillForm({ showModal, billId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const notify = () => {
		toast.error(`Bill deleted.`,
			{
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 2000
			})
	}

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(deleteBill(billId));
        dispatch(getUserBalance(sessionUser.id));

        notify();

        showModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        showModal(false);
    }

    return (
        <div>
            <form className='delete-confirmation-container' onSubmit={handleSubmit}>
                <div className='dc-text-container'>
                    <div className='dc-text'>
                        Are you sure you want to delete this bill?
                    </div>
                    <div className='dc-text'>
                        All associated expenses will also be deleted.
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="submit"
                        className='form-delete-btn'
                    >
                        Delete
                    </button>
                    <button
                        type='button'
                        onClick={handleCancelClick}
                        className='form-cancel-btn'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteBillForm;

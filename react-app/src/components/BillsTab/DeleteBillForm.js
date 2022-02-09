import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBill, getUserBalance } from "../../store/bills"


function DeleteBillForm({ showModal, billId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteBill(billId))
        dispatch(getUserBalance(sessionUser.id))

        showModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        showModal(false);
    }

    return (
        <div className='form-container'>
            <form className='form-input-container' onSubmit={handleSubmit}>
                <div className='form-label'>
                    Are you sure you want to delete this bill?
                </div>
                <div className='form-label'>
                    All associated expenses will also be deleted.
                </div>
                <div>
                    <button
                        type="submit"
                        className='form-submit-btn'
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

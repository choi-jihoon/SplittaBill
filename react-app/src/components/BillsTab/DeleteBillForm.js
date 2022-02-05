import React from "react";
import { useDispatch } from "react-redux";
import { deleteBill } from "../../store/bills"


function DeleteBillForm({ showModal, billId }) {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(deleteBill(billId))

        showModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        showModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Are you sure you want to delete this bill? All associated expenses will also be deleted.
            </label>
            <div>
                <button
                    type="submit"
                >
                    Delete
                </button>
                <button
                    type='button'
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default DeleteBillForm;

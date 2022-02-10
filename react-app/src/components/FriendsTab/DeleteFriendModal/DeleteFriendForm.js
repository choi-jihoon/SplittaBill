import React from "react";
import { useDispatch } from "react-redux";
import { removeFriend } from "../../../store/friends";

import './DeleteFriendForm.css'


function DeleteFriendForm({ showModal, id }) {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
		e.stopPropagation();
        console.log("STOP PROPAGATION");
        e.preventDefault();
		await dispatch(removeFriend(id));
        showModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        showModal(false);
    }

    return (
        <div>
            <form className='delete-confirmation-container' onSubmit={handleSubmit}>
                <div className='dc-text-container'>
                    <div className='dc-text'>
                        Are you sure you want to remove this friend?
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

export default DeleteFriendForm;

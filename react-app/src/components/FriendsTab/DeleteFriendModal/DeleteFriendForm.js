import React from "react";
import { useDispatch } from "react-redux";
import { removeFriend } from "../../../store/friends";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './DeleteFriendForm.css'


function DeleteFriendForm({ showModal, id }) {
    const dispatch = useDispatch();

    const notify = () => {
        toast.error(`Friend deleted.`,
            {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000
            })
    }
    const handleSubmit = async (e) => {
		e.preventDefault();
        e.stopPropagation();
		await dispatch(removeFriend(id));
        notify();
        showModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        showModal(false);
    }


    return (
        <div>
            <form className='delete-confirmation-container'>
                <div className='dc-text-container'>
                    <div className='dc-text'>
                        Are you sure you want to remove this friend?
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="button"
                        className='form-delete-btn'
                        onClick={handleSubmit}
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

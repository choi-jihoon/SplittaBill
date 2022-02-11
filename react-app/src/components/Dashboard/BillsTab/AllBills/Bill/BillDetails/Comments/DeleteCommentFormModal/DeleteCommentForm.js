import React from "react";
import { useDispatch } from "react-redux";

import { deleteComment, getComments } from "../../../../../../../../store/comments";

function DeleteCommentForm({ showModal, comment }) {
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await dispatch(deleteComment(comment.id));
		dispatch(getComments(comment.bill_id));
		showModal(false);
	};

	const handleCancelClick = async (e) => {
		e.preventDefault();
		showModal(false);
	};

	return (
		<form className='delete-confirmation-container-comment' onSubmit={handleSubmit}>
			<div className='dc-text-container'>
                    <div className='dc-text'>
						Are you sure you want to delete this comment?
                    </div>
                </div>
			<div className='dc-btn-container'>
				<button type="submit" className='form-delete-btn'>Delete</button>
				<button type="button" className='form-cancel-btn' onClick={handleCancelClick}>
					Cancel
				</button>
			</div>
		</form>
	);
}

export default DeleteCommentForm;

import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment, getComments } from "../../../store/comments";

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
		<form onSubmit={handleSubmit}>
			<label>Are you sure you want to delete this comment?</label>
			<div>
				<button type="submit">Delete</button>
				<button type="button" onClick={handleCancelClick}>
					Cancel
				</button>
			</div>
		</form>
	);
}

export default DeleteCommentForm;

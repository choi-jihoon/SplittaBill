import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../store/comments";

function DeleteCommentForm({ setShowModal, commentId }) {
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch(deleteComment(commentId));

		setShowModal(false);
	};

	const handleCancelClick = async (e) => {
		e.preventDefault();
		setShowModal(false);
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

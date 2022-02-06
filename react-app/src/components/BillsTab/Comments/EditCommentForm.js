import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment, getComments } from "../../../store/comments";

const EditCommentForm = ({ showModal, comment }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState(comment.message);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (newComment.length) {
			await dispatch(editComment(comment.id, newComment));
			await dispatch(getComments(comment.bill_id));
		}
		showModal(false);
	};
	const handleCancel = (e) => {
		e.preventDefault();
		showModal(false);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
				></textarea>
				<button>Submit Edit</button>
				<button onClick={handleCancel}>Cancel</button>
			</form>
		</div>
	);
};

export default EditCommentForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../../store/comments";

const EditCommentForm = ({ setShowModal, comment }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState(comment.message);
	const onSubmit = (e) => {
		e.preventDefault();
		if (newComment.length) {
			dispatch(editComment(comment.id, newComment));
		}
	};
	const handleCancel = (e) => {
		e.preventDefault();
		setShowModal(false);
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

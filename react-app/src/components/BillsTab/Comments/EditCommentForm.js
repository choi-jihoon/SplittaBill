import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editComment, getComments } from "../../../store/comments";

const EditCommentForm = ({ showModal, comment }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState(comment.message);
	const [errors, setErrors] = useState([]);
	useEffect(() => {
		if (newComment.length > 280) {
			setErrors(["Please use 280 characters or less"]);
		} else if (newComment.length <= 280) {
			setErrors([]);
		}
	}, [newComment]);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (newComment.length <= 280) {
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
				{errors.length > 0 &&
					errors.map((err, i) => <li key={i}>{err}</li>)}
			</form>
		</div>
	);
};

export default EditCommentForm;

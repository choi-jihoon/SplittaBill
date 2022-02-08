import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createComment, getComments } from "../../../store/comments";

const AddCommentForm = ({ billId }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const [errors, setErrors] = useState([]);
	const [disabled, setDisabled] = useState(false);
	useEffect(() => {
		if (comment.length > 280) {
			setErrors(["Please use 280 characters or less"]);
			setDisabled(true);
		} else if (comment.length === 0) {
			setDisabled(true);
		} else if (comment.length <= 280) {
			setErrors([]);
			setDisabled(false);
		}
	}, [comment]);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (comment.length <= 280) {
			await dispatch(createComment(billId, comment));
			dispatch(getComments(billId));
			setComment("");
		}
	};
	return (
		<form onSubmit={onSubmit} className="comment-form">
			<textarea
				className="comment-input"
				placeholder="Add a Comment!"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			></textarea>
			{errors.length > 0 &&
				errors.map((err, i) => <li key={i}>{err}</li>)}
			<button className="add-comment-button" disabled={disabled}>
				Post Comment
			</button>
		</form>
	);
};

export default AddCommentForm;

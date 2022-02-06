import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment, getComments } from "../../../store/comments";

const AddCommentForm = ({ billId }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		if (comment.length) {
			await dispatch(createComment(billId, comment));
			dispatch(getComments(billId));
			setComment("");
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<textarea
				className="comment-input"
				placeholder="Add a Comment!"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			></textarea>
			<button>Post Comment</button>
		</form>
	);
};

export default AddCommentForm;

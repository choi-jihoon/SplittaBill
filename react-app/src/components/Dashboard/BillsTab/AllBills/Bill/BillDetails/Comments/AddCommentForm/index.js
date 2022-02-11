import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createComment, getComments } from "../../../../../../../../store/comments";

const AddCommentForm = ({ billId }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (comment.length > 280) setErrors(["Please use 280 characters or less"]);
	}, [comment]);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (comment.length <= 280) {
			const data = await dispatch(createComment(billId, comment));
			dispatch(getComments(billId));
			setComment("");

			if (data) {
				const errors = {}
				for (let i = 0; i < data.length; i++) {
					const error = data[i].split(": ");
					errors[error[0]] = error[1]
				}
				setErrors(errors)
				return;
			}
		}


	};
	return (
		<form onSubmit={onSubmit} className="comment-form">
			<textarea
				className="comment-input"
				placeholder="Add a Comment!"
				required
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			></textarea>
			<div className='errors-container'>
				{errors.length > 0 &&
					errors.map((err, i) => <li key={i}>{err}</li>)}
			</div>
			<button className="add-comment-button">
				Post Comment
			</button>
		</form>
	);
};

export default AddCommentForm;

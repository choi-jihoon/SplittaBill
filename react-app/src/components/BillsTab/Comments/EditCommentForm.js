import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editComment, getComments } from "../../../store/comments";

const EditCommentForm = ({ showModal, comment }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState(comment.message);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const errors = [];
		if (newComment.length > 280) errors.push("Please use 280 characters or less.");
		setErrors(errors);
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
			<form className='form-container edit-form-container' onSubmit={onSubmit}>
				<div className='ef-input-container'>
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						className='ef-comment-input'
					></textarea>
					<div className='errors-container'>
						{errors.length > 0 &&
							errors.map((err, i) => <li key={i}>{err}</li>)}
					</div>
				</div>
				<div className='ef-btn-container'>
					<button
					disabled={errors.length > 0}
					className='form-delete-btn' id='ef-submit-btn'>Submit Edit</button>
					<button onClick={handleCancel}
					className='form-cancel-btn'>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default EditCommentForm;

import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { createComment, getComments } from "../../../store/comments";
const Comments = ({ billId }) => {
	const [comment, setComment] = useState("");
	const [submit, setSubmit] = useState(false);
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments.comments[billId]);
	// console.log(comments);
	useEffect(() => {
		dispatch(getComments(billId));
	}, []);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (comment.length) {
			await dispatch(createComment(billId, comment));
			dispatch(getComments(billId));
			setComment("");
			setSubmit(true);
		}
	};
	return (
		<div>
			<h3>COMMENTS</h3>
			{Array.isArray(comments) &&
				comments.length > 0 &&
				comments.map((comment) => {
					return (
						<div key={comment.id} className="comment-wrapper">
							<Comment comment={comment} />
						</div>
					);
				})}
			<form onSubmit={onSubmit}>
				<textarea
					className="comment-input"
					placeholder="Add a Comment!"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				></textarea>
				<button>Post Comment</button>
			</form>
		</div>
	);
};

export default Comments;

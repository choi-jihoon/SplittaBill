import React, { useEffect } from "react";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../../../store/comments";
const Comments = (props) => {
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments.comments);
	// console.log({ comments });
	const commentsArr = Object.values(comments);

	useEffect(() => {
		dispatch(getComments(1));
		// dispatch(getComments(billId)); TBD With bill integration
	}, []);
	return (
		<div>
			<div>COMMENTS</div>
			{commentsArr.length > 0 &&
				commentsArr.map((comment) => {
					// console.log(comment);
					return (
						<div key={comment.id} className="comment-wrapper">
							<Comment comment={comment} />
						</div>
					);
				})}
			<form>
				<textarea
					className="comment-input"
					placeholder="Add a Comment!"
				></textarea>
				<button>Post Comment</button>
			</form>
		</div>
	);
};

export default Comments;

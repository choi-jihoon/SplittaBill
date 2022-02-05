import React from "react";

const Comment = ({ comment }) => {
	return (
		<div
			style={{
				border: "1px solid black",
				margin: 10,
				width: "fit-content",
				padding: 8,
			}}
		>
			<div>Message: {comment?.message}</div>
			<div>Posted by: {comment?.username}</div>
			<div>Posted at: {comment?.created_at}</div>
		</div>
	);
};

export default Comment;

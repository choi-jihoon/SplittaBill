import React from "react";

const Comment = (comment) => {
	console.log(comment);
	return (
		<div>
			<div>{comment?.comment?.message}</div>
			<div>{comment?.comment?.username}</div>
			<div>{comment?.comment?.created_at}</div>
		</div>
	);
};

export default Comment;

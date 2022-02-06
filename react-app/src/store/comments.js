// constants
const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const DELETE_COMMENT = "comments/REMOVE_COMMENT";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const loadComments = (comments) => ({
	type: LOAD_COMMENTS,
	comments,
});

const removeComment = (comment) => ({
	type: DELETE_COMMENT,
	comment,
});

const addComment = (comment) => ({
	type: ADD_COMMENT,
	comment,
});

const updateComment = (comment) => ({
	type: UPDATE_COMMENT,
	comment,
});

export const getComments = (billId) => async (dispatch) => {
	const res = await fetch(`/api/comments/bills/${billId}`);
	const data = await res.json();

	dispatch(loadComments(data));
};
export const deleteComment = (id) => async (dispatch) => {
	const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
	const data = await res.json();
	if (res.ok) {
		dispatch(removeComment(data.comment));
		return null;
	}
};
export const editComment = (id, message) => async (dispatch) => {
	const res = await fetch(`/api/comments/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message }),
	});
	const data = await res.json();
	if (data.errors) {
		return data.errors;
	} else {
		dispatch(updateComment(data));
	}
};
export const createComment = (billId, message) => async (dispatch) => {
	const res = await fetch(`/api/comments/bills/${billId}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			billId,
			message,
		}),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(addComment(data));
		return;
	} else if (res.status < 500) {
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// const initialState = { comments: [] };
const initialState = { comments: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COMMENT: {
			const newState = { ...state };
			if (newState.comments[action.comment.bill_id]) {
				newState.comments[action.comment.bill_id] += action.comment;
			} else {
				newState.comments[action.comment.bill_id] = action.comment;
			}
			return newState;
		}
		case DELETE_COMMENT: {
			const newState = { ...state };
			delete newState.comments[action.comment.bill_id][action.comment.id];
			return newState;
		}
		case UPDATE_COMMENT: {
			const newState = { ...state };
			newState.comments[action.comment.bill_id][action.comment.id] =
				action.comment;
			return newState;
		}
		case LOAD_COMMENTS: {
			const newState = { ...state };
			newState.comments = { ...newState.comments, ...action.comments };
			return newState;
		}
		default: {
			return state;
		}
	}
}

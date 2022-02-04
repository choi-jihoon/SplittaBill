// constants
const GET_COMMENTS = "comments/SET_USER";
const DELETE_COMMENT = "comments/REMOVE_COMMENT";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

const loadComments = (comments) => ({
	type: GET_COMMENTS,
	payload: comments,
});

const removeComment = () => ({
	type: DELETE_COMMENT,
});

const addComment = (comment) => ({
	type: ADD_COMMENT,
	comment,
});

const updateComment = (comment) => ({});

export const getAllComments = () => async (dispatch) => {};
export const deleteComment = () => async (dispatch) => {};
export const editComment = () => async (dispatch) => {};
export const createComment = () => async (dispatch) => {};
const initialState = { comments: [] };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_COMMENT:
			return;
		case DELETE_COMMENT:
			return;
		case UPDATE_COMMENT:
			return;
		case GET_COMMENTS:
			return;
		default:
			return state;
	}
}

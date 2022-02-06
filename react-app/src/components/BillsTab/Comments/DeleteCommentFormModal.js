import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteCommentForm from "./DeleteCommentForm";

function DeleteCommentFormModal({ comment }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id="delete-comment" onClick={() => setShowModal(true)}>
				Delete
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteCommentForm
						showModal={setShowModal}
						comment={comment}
					/>
				</Modal>
			)}
		</>
	);
}

export default DeleteCommentFormModal;

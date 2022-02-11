import React, { useState } from "react";

import { Modal } from "../../../../../../../../context/Modal";
import DeleteCommentForm from "./DeleteCommentForm";

function DeleteCommentFormModal({ comment, display }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				id="delete-comment"
				style={{ display: display ? "block" : "none" }}
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-trash delete-comment-icon"></i>
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

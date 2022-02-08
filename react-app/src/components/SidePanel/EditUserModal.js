import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditUser from "./EditUser";

function EditUserModal({ user }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				id="edit-user"
				onClick={() => setShowModal(true)}
				style={{
					zIndex: 100,
				}}
				className="edit-user-pic-btn"
			>
				<i className="fas fa-edit"></i>
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditUser showModal={setShowModal} user={user} />
				</Modal>
			)}
		</>
	);
}

export default EditUserModal;

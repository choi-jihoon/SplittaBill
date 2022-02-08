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
					// position: "absolute",
					// top: 60,
					// left: 10,
					// border: "1px solid red",
					zIndex: 100,
				}}
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

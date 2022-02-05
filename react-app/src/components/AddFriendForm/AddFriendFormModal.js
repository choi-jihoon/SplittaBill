import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddFriendForm from '.';

function AddFriendFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='add-friend'
          onClick={() => setShowModal(true)}>
          Add Friend
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <AddFriendForm setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default AddFriendFormModal;

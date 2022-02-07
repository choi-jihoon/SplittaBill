import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import FriendDetails from './FriendDetails';

function FriendDetailsModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='friend-details'
          onClick={() => setShowModal(true)}>
          See Friend Details
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <FriendDetails showModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default FriendDetailsModal;

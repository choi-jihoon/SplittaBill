import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import FriendDetails from './FriendDetails';

function FriendDetailsModal({ friendId, username, balance}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='friend-details'
          onClick={() => setShowModal(true)}>
          See Friend Details<i className="fas fa-search-plus"></i>
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <FriendDetails showModal={setShowModal} username={username} balance={balance} friendId={friendId} />
          </Modal>
        )}
      </>
    );
  }

  export default FriendDetailsModal;

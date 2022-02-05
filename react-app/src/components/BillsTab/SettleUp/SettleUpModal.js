import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SettleUpForm from './SettleUpForm';

function SettleUpModal() {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='settle-up'
          onClick={() => setShowModal(true)}>
          Settle Up
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SettleUpForm showModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default SettleUpModal;

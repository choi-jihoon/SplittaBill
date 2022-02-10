import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SettleUpForm from './SettleUpForm';

import "./SettleUp.css"

function SettleUpModal({ expense }) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          id='settle-up'
          onClick={() => setShowModal(true)}>
          <i class="fas fa-hand-holding-usd"></i>
          {/* <i className="fas fa-money-bill-wave"></i> */}
          {/* Settle Up! */}
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SettleUpForm showModal={setShowModal} expense={expense} />
          </Modal>
        )}
      </>
    );
  }

  export default SettleUpModal;

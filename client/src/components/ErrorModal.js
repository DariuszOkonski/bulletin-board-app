import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({
  show = false,
  title = 'Error',
  message = '',
  onClose,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;

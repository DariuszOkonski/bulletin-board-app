import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorModal = ({
  show = false,
  title = 'Something went wrong',
  message = 'Query failed',
  shouldRedirect = true,
  setIsShown,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (shouldRedirect) {
      navigate('/');
    } else {
      setIsShown(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;

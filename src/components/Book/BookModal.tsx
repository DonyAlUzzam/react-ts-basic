import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateBookForm from './CreateBookForm';

interface BookModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (data: any) => void;
  categories: any[];
  selectedBook?: any;
}

const BookModal: React.FC<BookModalProps> = ({ show, handleClose, handleSubmit, categories, selectedBook }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateBookForm onSubmit={handleSubmit} category={categories} book={selectedBook || undefined} closeModal={handleClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookModal;

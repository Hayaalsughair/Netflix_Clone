import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import '../modalMovie/ModalMovie.css';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";


function MovieModal(props) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // You can handle the submission of the comment here
    // For example, send it to a server or update state
    console.log('Comment submitted:', comment);
    // Clear the comment field after submission
    setComment('');
    // Close the modal
    props.handleClose();
  };
  const [readMore, setReadMore] = useState(false);

  return (
    <Modal show={props.show} onHide={props.handleClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{props.chosenMovie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='movieImg'>
          <img className='rounded' src={`https://image.tmdb.org/t/p/w185${props.chosenMovie.poster_path}`} alt='movie' />
        </div>
        <div className='textDescription'>
        {readMore? props.chosenMovie.overview:`${props.chosenMovie.overview.substring(0,120)}...`}
        <div className="under">
                        <button className="state-btn" onClick={()=> setReadMore(!readMore)}>
                            {readMore ? <SlArrowDown />: <SlArrowUp />
}
                        </button>
        </div>
      </div>
        {/* Text area for adding comments */}
        <Form.Group controlId="comment">
          <Form.Label className="lableText"> <h5>Add Comment:</h5></Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment here..."
            value={comment}
            onChange={handleCommentChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
      <button className="btn" onClick={props.handleClose}>Close </button>
      <button className="btn" onClick={handleSubmit}> add to favorite </button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieModal;

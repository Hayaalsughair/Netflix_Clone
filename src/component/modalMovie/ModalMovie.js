import React, { useRef, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import '../modalMovie/ModalMovie.css';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
// import axios from 'axios';

function ModalMovie(props) {
  //1
  const commentRef = useRef(null);

  //3
  function handleComment(e){
    e.preventDefault();
    let userComment = commentRef.current.value;
    console.log("user Comment", userComment);
    //spreading data 
    let newMovie = { ...props.chosenMovie, comment:userComment};
    props.updateMovie(newMovie, props.chosenMovie.id);
  }

  // Handel to DB
  async function handleAddFav(e, movie) {
    e.preventDefault();
    console.log("the movie:",movie);
    let url = `https://movies-library-2.onrender.com/addMovie`;
    console.log("Database URL:", url);
    let data = {
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      comment: movie.comment || "No Comment Added "
    };
    console.log("the data:",data);
    
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      mode: 'no-cors' // Set mode to 'no-cors'
    });
  
    if (response.ok) {
      let addedMovie = await response.json();
      console.log("addedMovie:",addedMovie);   
    } else {
      console.log("Response not OK:", response);
    }
  }
  
  
  
  const [readMore, setReadMore] = useState(false);

  return (
    <Modal show={props.show} onHide={props.handleClose} centered className="custom-modal">
      <Modal.Header closeButton >
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
                {readMore ? <SlArrowUp />:<SlArrowDown />}
            </button>             
        </div>
      </div>

        {/* Text area for adding comments */}
        {props.chosenMovie.comment? props.chosenMovie.comment:"No comment is add"}

        <Form>
        <Form.Group controlId="comment">
          <Form.Label className="lableText"> <h5>Add Comment:</h5></Form.Label>
          {/* 2  use ref */}
          <Form.Control ref={commentRef} type="text" placeholder="Enter your comment here..."  />
          <Form.Text className="text-muted">
          Add your owen comment
          </Form.Text>
        </Form.Group>
        <button className="btn" onClick={props.handleClose}> Close </button>
        <button className="btn" type="submit" onClick={(e)=> handleComment(e)}> add comment </button>
        <button className="btn" type="submit" onClick={(e)=> {
        handleAddFav(e, props.chosenMovie)}}> add to favorite </button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMovie;

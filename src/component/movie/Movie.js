import { useState } from "react";
import ModalMovie from "../modalMovie/ModalMovie"
import '../movie/Movie.css';

export default function MovieCard(props){
const [show, setShow]= useState(false);
const [chosenMovie, setChosenMovie]= useState();

const handleClose = ()=> setShow(false);

const handleShow = (movie)=>{
    setChosenMovie(movie);
    setShow(true);
} 
return(
    <>
  <div className="a-box">
  <div className="img-container">
    <div className="img-inner">
      <div className="inner-skew">
        <img  src={`https://image.tmdb.org/t/p/w185${props.movie.poster_path}`} alt="img"/>
      </div>
    </div>
  </div>
  <div className="text-container">
    <h3>{props.movie.title || props.movie.name} </h3>
    <div>
    <button className="btn" onClick={()=> {handleShow(props.movie)}}> add to  favorite </button>
  </div>
</div>
</div>

    {
        chosenMovie && <ModalMovie show={show}
        handleClose={handleClose} chosenMovie={chosenMovie} updateMovie={props.updateMovie} />
    }

    </>
)
}

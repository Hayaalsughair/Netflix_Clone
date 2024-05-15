import NavBar from '../navBar/NavBar.js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from "react";
import '../favMovie/FavMovie.css'
function FavList({ jsonRes }) {
     const [favMovies, setFavMovies] = useState([]);

     const sendReq = async () => {
          const serverURL = `https://movies-library-6ldd.onrender.com/allMovies`;
          // const serverURL = `http://localhost:3001/allMovies`;
          const res = await fetch(serverURL);
          const jsonRes = await res.json();
          setFavMovies(jsonRes);
     };
     useEffect(() => {
          sendReq();
     }, []);
     console.log(favMovies);
     const deleteItem = async (id) => {
          const res = await fetch(`https://movies-library-6ldd.onrender.com/deelteMovie/${id}`, { method: "DELETE" });
       //    const res = await fetch(`http://localhost:3001/deelteMovie/${id}`, { method: "DELETE" });
          if (res.ok) {
               setFavMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id));
          }
     }

     const handleUpdate = async (movieId, updatedComment) => {
          const updatedMovies = favMovies.map(movie => {
               if (movie.id === movieId) {
                    return { ...movie, comment: updatedComment };
               }
               return movie;
          });
          setFavMovies(updatedMovies);

        const serverURL = `https://movies-library-6ldd.onrender.com/updateMovie/${movieId}`;
          // const serverURL = `http://localhost:3001/updateMovie/${movieId}`;
          const res = await fetch(serverURL, {
               method: "PUT",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({ comment: updatedComment })
          });

          if (!res.ok) {
               // Handle error
          }
     };

     const [editingMovieId, setEditingMovieId] = useState(null);
     const [newComment, setNewComment] = useState("");

     const startEditing = (id, comment) => {
          setEditingMovieId(id);
          setNewComment(comment);
     }

     const cancelEditing = () => {
          setEditingMovieId(null);
          setNewComment("");
     }

     const submitUpdate = async (id) => {
          await handleUpdate(id, newComment);
          setEditingMovieId(null);
          setNewComment("");
     }


     return (
          <div>
               <NavBar />
               <div className="ca">
                    {favMovies.map((movie) => (
                         <div key={movie.id}>
                              <Card className="movie-card" style={{ width: '18rem', backgroundColor: '#f3f3f3' }} >
                                   <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster}`} />
                                   <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        {editingMovieId === movie.id ? (
                                             <>
                                                  <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                                                  <Button variant="primary" onClick={() => submitUpdate(movie.id)}>Submit</Button>
                                                  <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
                                             </>
                                        ) : (
                                             <>
                                                  <Card.Text >{movie.comment}</Card.Text>
                                                  <div className="btns">
                                                       <Button className="btn d" onClick={() => deleteItem(movie.id)}>Delete</Button>
                                                       <Button className="btn ed" onClick={() => startEditing(movie.id, movie.comment)}>Update</Button>
                                                  </div>
                                             </>)}

                                   </Card.Body>
                              </Card>
                         </div>
                    ))}
               </div>
          </div>
     );
}

export default FavList;
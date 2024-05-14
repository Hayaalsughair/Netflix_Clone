import { useEffect, useState } from "react";
import MovieList from '../moiveList/MovieList.js';


export default function Home(){
    const [movies, setMovies]= useState ([]);

    async function getMovies() {
        // let serverUrl = process.env.REACT_KEY_SERVER;
        const url = "https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US"
        //To tset it 
        console.log("server url: ", url);

        let response = await fetch(url);
        //To show what inside the response 
        console.log("response:", response);

        //send data as array of object
        let moviesData = await response.json();
        setMovies(moviesData.results); // <= This to update the state (now the data come from server stored here )
    }
    
    useEffect( ()=>{
        getMovies();}
        , [] )
    return(
        <>
           <div className="home-container">
            <h1 className="home-title"> </h1>
             <MovieList movies={movies} />
             </div>
        </>
    );
}
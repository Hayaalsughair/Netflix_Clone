import MovieCard from "../movie/Movie" 

export default function MovieList(props){
return(
  <>

  {
    props.movies.map((movie)=> {
      return(
        <>
        <MovieCard movie={movie} key ={movie.id} updateMovie={props.updateMovie} />
        </>
      )
    })
  }
  </>
)
}
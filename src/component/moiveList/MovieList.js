import MovieCard from "../movie/Movie" 

export default function MovieList(props){
return(
  <>

  {
    props.movies.map((moive)=> {
      return(
        <>
        <MovieCard movie={moive} />
        </>
      )
    })
  }
  </>
)
}
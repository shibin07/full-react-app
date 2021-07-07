import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = (props) => {
  if (props.movies.length < 0) return <h1>No Records found</h1>;

  return (
    <>
      {props.movies.map((movieDetail) => (
        // need to add the key in any iteration
        <MovieCard key={movieDetail.id} detail={movieDetail} />
      ))}
    </>
  );
};

export default MovieList;

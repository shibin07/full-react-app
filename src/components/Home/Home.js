import React, { useState, useEffect, useContext, useCallback } from "react";
import Button from "../Button/Button";
import MovieList from "../MovieList/MovieList";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { orderBy } from "lodash";

const Home = () => {
  const [movies, setMovies] = useState([]);

  // this is the normal fetch request
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  // this is for custom hook using useHttp
  const moviesData = useCallback((innerText, moviesList) => {
    console.log("inner text value binded", innerText);
    const movieNames = moviesList.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
      };
    });
    console.log("list of movies", movieNames);
    const sortedMoves = orderBy(movieNames, ["id"], ["asc"]);
    setMovies(sortedMoves);
  }, []);

  // this is for custom hook using useHttp
  const { isLoading, error, sendRequest: fetchLatestMovies } = useHttp();

  const onClickHandler = (event) => {
    fetchLatestMovies(
      { url: "http://swapi.dev/api/films" },
      moviesData.bind(null, event.target.innerText)
    );
  };

  // normal fetch request with async await example

  // const fetchLatestMovies = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const moviesResponse = await fetch("http://swapi.dev/api/films");
  //     console.log("respone message", moviesResponse);
  //     if (!moviesResponse.ok) throw new Error("Something went wrong");

  //     const moviesData = await moviesResponse.json();
  //     const movieNames = moviesData.results.map((movie) => {
  //       return {
  //         id: movie.episode_id,
  //         title: movie.title,
  //       };
  //     });
  //     console.log("list of movies", movieNames);
  //     const sortedMoves = orderBy(movieNames, ["id"], ["asc"]);
  //     setMovies(sortedMoves);
  //   } catch (error) {
  //     console.log("error message", error);
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // };

  // if this useEffect is used with custom hook and we dont have the callback logic done in custom hook
  // it will be a infinite loop so we have to put the empty dependies without the callback login
  // But with the normal fetch request called in the component we can add the dependency - no issues

  // The state is the custom hook is also part of the component so when the sate changed the component rerenders
  // On the same the useHttp hook will be called -> return new func obj(if binded in dependencies) -> useEffect will run again

  // if the extra value should be received in the sendrequest func (moviesData)
  // then use bind, but when using bind make sure that the first object is null since that is the this obj
  // since in our case it is this function and second argument is the value to be passed
  // in sendrequest this would be received as a first argument and the second arg that is receive is the actual data from request
  // bind is for pre configuring func

  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.isLoggedIn)
      fetchLatestMovies(
        { url: "http://swapi.dev/api/films" },
        moviesData.bind(null, "")
      );
  }, [fetchLatestMovies]);

  let content = (
    <h3>
      <p>No movies found yet please click the button to list the movies name</p>
    </h3>
  );

  if (movies.length > 0) content = <MovieList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col text-center">
            <h1>Welcome to home page</h1>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <p>Fetch the latest movie details by clicking this button </p>
            <Button className="btn btn-primary" onClick={onClickHandler}>
              click
            </Button>
          </div>
        </div>
        <center>{content}</center>
      </div>
    </div>
  );
};

export default Home;

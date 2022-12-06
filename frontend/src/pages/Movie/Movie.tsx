import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SingleMovie from "../../components/SingleMovie";
import "./Movie.css";
function Movie() {
  const [selectedMovie, setMovie] = useState({} as any);

  const [suggestMovies, setSuggestMovies] = useState([] as any[]);

  const { movieId } = useParams();

  useEffect(() => {
    console.log("movieId : ", movieId);
    if (!movieId) return;
    async function fetchSelectedMovie() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=ad2c28e0345278f3c8b002efddadf28f`
        );
        const movie = await response.json();

        if (!movie) return;
        console.log("movie :", movie);

        setMovie(movie);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=ad2c28e0345278f3c8b002efddadf28f`
        );
        const movies = await response.json();

        if (!movies) return;
        setSuggestMovies(movies.results);
        console.log("movies :", movies);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSelectedMovie();
    fetchMovies();
  }, [movieId]);

  return (
    <div className="movie-page">
      <h3>{selectedMovie.title}</h3>
      <div className="movie-infos">
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}?api_key=ad2c28e0345278f3c8b002efddadf28f`}
          alt={`${selectedMovie.title}'s pic`}
        />
        <div>
          <span >{selectedMovie.overview}</span>
          <div style={{marginTop : '30px'}}>
            Genre : {selectedMovie.genres.map((genre: any) => genre.name).join(', ')}
          </div>
          <div style={{marginTop : '30px'}}>
            Date de sortie : {selectedMovie.release_date}
          </div>
        </div>
      </div>
      <h4>Films suggérés</h4>

      <div className="movie-container">
        {suggestMovies.map((movie) => (
          <Link to={`/${movie.id}`} key={movie.id}>
            <SingleMovie movie={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movie;

import React, { useState } from "react";
import "./Home.css";
import { useEffect } from "react";
function Home() {
  const [movies, setMovies] = useState([] as any[]);
  const [isDataLoading, setDataLoading] = useState(false);

  const [sortByTime, setSortByTime] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setDataLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=ad2c28e0345278f3c8b002efddadf28f`
        );
        const movies = await response.json();

        if (!movies) return;
        setMovies(movies.results);
        console.log("movies :", movies);
      } catch (err) {
        console.log(err);
      } finally {
        setDataLoading(false);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    console.log('sortByTime :', sortByTime)
    const filteredMovies = sortByTime
      ? movies.sort(
          (a, b) =>
            (new Date(a.release_date) as any) -
            (new Date(b.release_date) as any)
        )
      : movies.sort((a, b) => a.title - b.title);
      console.log('filteredMovies :', filteredMovies)
    setMovies(filteredMovies);
  }, [sortByTime, movies]);

  return (
    <div className="column">
      <div className="movie-container">
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <img
              src={`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=ad2c28e0345278f3c8b002efddadf28f`}
              alt={`${movie.title}'s pic`}
            />
            <div className="movie__title">{movie.title}</div>
            <div className="movie__description">{movie.overview}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setSortByTime(!sortByTime)}>Sort by time</button>
    </div>
  );
}

export default Home;

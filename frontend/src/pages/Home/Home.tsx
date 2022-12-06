import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import SingleMovie from "../../components/SingleMovie";
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
    console.log("sortByTime :", sortByTime);
    const filteredMovies = sortByTime
      ? movies.sort(
          (a, b) =>
            (new Date(a.release_date) as any) -
            (new Date(b.release_date) as any)
        )
      : movies.sort((a, b) => a.title - b.title);
    console.log("filteredMovies :", filteredMovies);
    setMovies(filteredMovies);
  }, [sortByTime, movies]);

  return (
    <div className="column">
      <h2>Fims populaires</h2>
      <div className="movie-container">
        {movies.map((movie) => (
          <Link to={`/${movie.id}`} key={movie.id}>
            <SingleMovie movie={movie} />
          </Link>
        ))}
      </div>
      <button onClick={() => setSortByTime(!sortByTime)}>
        {sortByTime ? "Trier par titre" : "Trier par date de sortie"}
      </button>
    </div>
  );
}

export default Home;

function SingleMovie({ movie }: any) {
  return (
    <div className="movie">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=ad2c28e0345278f3c8b002efddadf28f`}
        alt={`${movie.title}'s pic`}
      />
      <div className="movie__title">{movie.title}</div>
      <div className="movie__description">{movie.overview}</div>
    </div>
  );
}

export default SingleMovie;

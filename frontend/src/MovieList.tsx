function MovieList() {
  const movies = [
    { id: 1, title: "Blah", year: 2010 },
    { id: 2, title: "Blah blah", year: 1999 },
    { id: 3, title: "Blah", year: 2014 },
  ];

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Movie List</h3>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item">
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MovieList;

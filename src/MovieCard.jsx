function MovieCard({ show, onClick }) {
  const img = show.image?.medium || "https://via.placeholder.com/210x295";
  const year = show.premiered ? show.premiered.substring(0, 4) : "N/A";
  const apiRating = show.rating?.average ? "★ " + show.rating.average : "";

  return (
    <article className="movie-card" onClick={onClick}>
      <img src={img} alt={show.name} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{show.name}</h3>
        <div className="movie-meta">
          <span>{year}</span>
          <span className="visual-stars">{apiRating}</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import ShowModal from "./ShowModal";

function Home({ searchQuery }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedShowId, setSelectedShowId] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (searchQuery) {
      fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          setShows(data.map(item => item.show));
          setLoading(false);
        });
    } else {
      fetch("https://api.tvmaze.com/shows?page=1")
        .then(res => res.json())
        .then(data => {
          setShows(data.slice(0, 24));
          setLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <main className="container">
      <header className="page-header">
        <h1>{searchQuery ? `Results for "${searchQuery}"` : "Discover"}</h1>
      </header>

      {loading ? (
        <div id="loader"><div className="spinner"></div></div>
      ) : (
        <section className="movies-grid">
          {shows.length > 0 ? (
            shows.map(show => (
              <MovieCard 
                key={show.id} 
                show={show} 
                onClick={() => setSelectedShowId(show.id)} 
              />
            ))
          ) : (
            <p className="error-text">No shows found.</p>
          )}
        </section>
      )}

      {selectedShowId && (
        <ShowModal 
          showId={selectedShowId} 
          onClose={() => setSelectedShowId(null)} 
        />
      )}
    </main>
  );
}

export default Home;
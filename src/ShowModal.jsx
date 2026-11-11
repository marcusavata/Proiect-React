import { useState, useEffect } from "react";

function ShowModal({ showId, onClose }) {
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${showId}?embed=cast`)
      .then((res) => res.json())
      .then((data) => setShow(data));
  }, [showId]);

  if (!show) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  const img = show.image?.original || show.image?.medium || "https://via.placeholder.com/400x600/1a2127/99aabb?text=No+Poster";
  const year = show.premiered ? show.premiered.substring(0, 4) : "N/A";
  const genres = show.genres || [];
  const cast = show._embedded?.cast?.slice(0, 5).map(c => c.person.name).join(", ") || "Unknown";
  const runtime = show.averageRuntime || show.runtime || "?";
  const summaryText = show.summary ? show.summary.replace(/<[^>]*>?/gm, '') : "No description available.";

  const renderStars = () => {
    let stars = [];
    for (let i = 5; i >= 1; i--) {
      stars.push(
        <input key={`in-${i}`} type="radio" id={`star${i}`} name="rating" value={i} />
      );
      stars.push(
        <label key={`lbl-${i}`} htmlFor={`star${i}`}>★</label>
      );
    }
    return stars;
  };

  return (
    <div 
      className="modal" 
      onClick={(e) => { 
        if (e.target.classList.contains("modal")) onClose(); 
      }}
    >
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>×</span>
        
        <div className="modal-body">
          <div className="modal-header-grid">
            <img src={img} className="modal-poster" alt={show.name} />
            <div>
              <h2>{show.name} <span style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>({year})</span></h2>
              <div className="tags">
                {genres.map(g => <span key={g} className="tag">{g}</span>)}
                <span className="tag">{runtime} min/ep</span>
              </div>
              <p className="cast-list"><strong>Cast:</strong> {cast}</p>
              <div style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                {summaryText}
              </div>
              
              <div className="controls-grid">
                <div className="control-group">
                  <label>Watch Status</label>
                  <select id="sel-status" defaultValue="none">
                    <option value="none">Not Tracked</option>
                    <option value="plan_to_watch">Plan to Watch</option>
                    <option value="watching">Watching</option>
                    <option value="completed">Completed</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>Custom Lists</label>
                  <select id="sel-add-list" defaultValue="">
                    <option value="">-- Add to Custom List --</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="review-section">
            <h3>Log your review</h3>
            <form className="review-form" onSubmit={(e) => e.preventDefault()}>
              <div className="rating-wrapper">
                <span>Your Rating:</span>
                <div className="star-rating">
                  {renderStars()}
                </div>
                <label style={{ marginLeft: "auto", cursor: "pointer", color: "var(--text-secondary)" }}>
                  <input type="checkbox" id="rev-spoiler" /> Contains Spoilers?
                </label>
              </div>
              <textarea id="rev-text" placeholder="Add a review..."></textarea>
              <button type="submit" className="btn btn-primary">Save Review & Status</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ShowModal;
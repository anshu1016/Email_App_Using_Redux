import React from "react";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "./EmailSlice";

function EmailDetail({ email }) {
  const dispatch = useDispatch();

  if (!email) return null;

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(email.id));
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "transparent",
    border: "none",
    fontSize: "1.5em",
    cursor: "pointer"
  };

  const favoriteButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: email.favorite ? "#E54065" : "#E1E4EA",
    color: "white",
    padding: "5px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  };
  const handleBack = () => {
    dispatch({ type: "emails/clearCurrentEmail" }); // Assuming you have this action in your slice
  };
  return (
    <div
      style={{
        position: "relative",
        padding: "40px",
        borderLeft: "1px solid #CFD2DC"
      }}
    >
      <button style={closeButtonStyle} onClick={handleBack}>
        &times;
      </button>

      {/* Favorite Button */}
      <button onClick={handleFavoriteClick} style={favoriteButtonStyle}>
        {email.favorite ? "Remove from Favorites" : "Mark as Favorite"}
      </button>

      <h2 style={{ color: "#636363", marginBottom: "20px" }}>
        {email.subject}
      </h2>
      <p style={{ color: "#636363" }}>{email.body}</p>
      <p style={{ fontSize: "0.8em", color: "#636363", marginTop: "20px" }}>
        {new Date(email.date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}
      </p>
    </div>
  );
}

export default EmailDetail;

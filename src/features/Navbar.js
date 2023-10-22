import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../features/EmailSlice";
import { Link } from "react-router-dom";
import "./nav.css";
function NavBar() {
  const dispatch = useDispatch();

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  return (
    <nav>
      <div>
        <Link to="/">Back</Link>
      </div>
      <div>
        <span>Filter By: </span>
        <button onClick={() => handleFilterChange("All")}>All</button>
        <button onClick={() => handleFilterChange("Unread")}>Unread</button>
        <button onClick={() => handleFilterChange("Read")}>Read</button>
        <button onClick={() => handleFilterChange("Favorites")}>
          Favorites
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

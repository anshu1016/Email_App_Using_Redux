import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmailBody, fetchEmails } from "./EmailSlice.js";
import "./sty.css";
function EmailList({ emails }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.emails.currentPage);
  const totalPages = useSelector((state) => state.emails.totalPages);
  // This function fetches the email body when an email is clicked.
  const handleEmailClick = (emailId) => {
    dispatch(fetchEmailBody(emailId));
  };
  const handlePrevPage = () => {
    dispatch(fetchEmails(1)); // Fetch previous page
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchEmails(currentPage + 1)); // Fetch next page
    }
  };
  console.log(emails, "EMAILS");
  return (
    <div className="email-container">
      <h2>Emails</h2>
      <ul className="email-list">
        {emails?.map((email) => (
          <li
            key={email.id}
            onClick={() => handleEmailClick(email.id)}
            className="email-item"
          >
            <div className="email-profile-pic">
              <span>
                {typeof email.from === "string"
                  ? email.from.charAt(0).toUpperCase()
                  : "N/A"}
              </span>
            </div>
            <div className="email-details">
              <div>
                <strong>From:</strong> {email.from.name} ({email.from.email})
              </div>
              <div>
                <strong>Subject:</strong> {email.subject}
              </div>
              <div className="email-short-desc">
                {email.short_description.split(" ").slice(0, 6).join(" ") +
                  "..."}
              </div>
              <div className="email-date">
                {new Date(email.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
              {email.favorite && <div className="email-favorite">Favorite</div>}
            </div>
          </li>
        ))}
      </ul>

      <div className="email-pagination">
        <button onClick={handlePrevPage}>Prev</button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EmailList;

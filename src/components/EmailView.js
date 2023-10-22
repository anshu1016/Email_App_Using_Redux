import React, { useEffect } from "react";
import EmailList from "../features/EmailList";
import EmailDetail from "../features/EmailDetail.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmails } from "../features/EmailSlice";
import "./view.css";

const EmailView = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.emails.emails);
  const status = useSelector((state) => state.emails.status);
  const error = useSelector((state) => state.emails.error);
  const currentEmail = useSelector((state) => state.emails.currentEmail);
  const filter = useSelector((state) => state.emails.filter);

  let filteredEmails = emails.list;

  if (emails.list) {
    // Check if emails.list exists
    if (filter === "Unread") {
      filteredEmails = emails.list.filter((email) => !email.read);
    } else if (filter === "Read") {
      filteredEmails = emails.list.filter((email) => email.read);
    } else if (filter === "Favorites") {
      filteredEmails = emails.list.filter((email) => email.favorite);
    }
  }

  const handleBack = () => {
    dispatch({ type: "emails/clearCurrentEmail" });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEmails());
    }
  }, [status, dispatch]);

  return (
    <div className="email-view">
      <h1>Email View</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="email-layout">
        <div>{emails.list && <EmailList emails={filteredEmails} />}</div>
        {currentEmail && (
          <div>
            <EmailDetail email={currentEmail} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailView;

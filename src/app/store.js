import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "../features/EmailSlice"; // Ensure path is correct

const store = configureStore({
  reducer: {
    emails: emailsReducer
  }
});

export default store;

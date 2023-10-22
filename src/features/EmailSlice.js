import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async (page = 1) => {
    const response = await axios.get(
      `https://flipkart-email-mock.now.sh/?page=${page}`
    );
    return response.data;
  }
);

export const fetchEmailBody = createAsyncThunk(
  "emails/fetchEmailBody",
  async (emailId) => {
    const response = await axios.get(
      `https://flipkart-email-mock.now.sh/?id=${emailId}`
    );
    console.log(response.data, "PARTICULAR_RESPONSE");
    return response.data;
  }
);

const initialState = {
  emails: [],
  currentEmail: null,
  status: "idle",
  error: null,
  filter: "All",
  sortBy: "date",
  currentPage: 1, // Add this
  totalPages: null
};

export const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    toggleFavorite: (state, action) => {
      const email = state.emails.list.find(
        (email) => email.id === action.payload
      );
      email.favorite = !email.favorite;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; // Add this
    },
    clearCurrentEmail: (state) => {
      state.currentEmail = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: {
    [fetchEmails.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEmails.fulfilled]: (state, action) => {
      state.status = "success";
      state.emails = action.payload;
      state.currentPage = state.currentPage || 1; // This will retain the currentPage if already set, else default to 1
      state.totalPages = Math.ceil(action.payload.total / 10);
    },
    [fetchEmails.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchEmailBody.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEmailBody.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentEmail = action.payload;
    },
    [fetchEmailBody.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

export const { setFilter, setSortBy, toggleFavorite } = emailsSlice.actions;

export default emailsSlice.reducer;

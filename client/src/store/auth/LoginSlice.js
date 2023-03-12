import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk(
  "Login/fetchLogin",
  async function (userObj, { rejectWithValue, dispatch }) {
    let echo;

    try {
      await axios
        .post("http://localhost:2000/auth/login", userObj, {
          withCredentials: true,
        })
        .then((data) => {
          echo = data.data;
        });
      return echo;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    user: {},
    status: null,
    error: null,
  },
  reducers: {
    logout(state, action) {
      state.user = {};
      state.status = null;
      state.error = null;
    },
    VerifyUser(state, action) {
      state.user = action.payload;
      state.status = "Verified user";
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "Loading";
      state.error = "null";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "Resolved";
      state.user = action.payload;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "Rejected";
      state.error = action.payload;
    },
  },
});

export const { logout, VerifyUser } = LoginSlice.actions;
export default LoginSlice.reducer;

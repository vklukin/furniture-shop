import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLogin, VerifyUser } from "./LoginSlice";
import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

export const verifyLoginUser = createAsyncThunk(
  "VerifyToken/verifyLoginUser",
  async (token, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    let echo;

    try {
      await axios
        .post(
          "http://localhost:2000/api/checkAuth",
          { token },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          echo = data.data;
          dispatch(VerifyUser(echo));
        })
        .catch((e) => {
          console.log(e);
        });

      return echo;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

const VerifyTokenSlice = createSlice({
  name: "VerifyToken",
  initialState: {
    status: null,
    error: null,
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "Loading";
      state.error = "null";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "Resolved";
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "Rejected";
      state.error = action.payload;
    },
  },
});

export default VerifyTokenSlice.reducer;

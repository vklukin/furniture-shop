import { configureStore } from "@reduxjs/toolkit";

import LoginSlice from "./auth/LoginSlice";
import VerifyTokenSlice from "./auth/VerifyTokenSlice";

export default configureStore({
  reducer: {
    Login: LoginSlice,
    VerifyToken: VerifyTokenSlice,
  },
});

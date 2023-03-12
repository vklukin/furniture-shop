import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { verifyLoginUser } from "./store/auth/VerifyTokenSlice";

import MainPage from "./pages/MainPage";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PrivateRoute from "./controllers/Routes/PrivateRoute";
import Profile from "./pages/Profile";
import PrivateAdminRoute from "./controllers/Routes/PrivateAdminRoute";
import AdminPage from "./pages/AdminPage";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyLoginUser(JSON.parse(localStorage.getItem("auth-token"))));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>

        <Route path="/admin.php" element={<PrivateAdminRoute />}>
          <Route path="/admin.php" element={<AdminPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<MainPage />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;

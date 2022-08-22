import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Explore from "./pages/Explore";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import User from "./pages/User";
import People from "./pages/People";
import Copyright from "./components/Copyright/Copyright";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <NavigationBar />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Explore /> : <SignIn />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Explore /> : <SignUp />}
          />
          <Route
            path="/explore"
            element={isAuthenticated ? <Explore /> : <SignIn />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <SignIn />}
          />
          <Route
            path="/user/:id"
            element={isAuthenticated ? <People /> : <SignIn />}
          />
          <Route
            path="/liked"
            element={isAuthenticated ? <User /> : <SignIn />}
          />
        </Routes>
        {isAuthenticated && <Copyright />}
        <ToastContainer limit={3} />
      </BrowserRouter>
    </>
  );
}

export default App;

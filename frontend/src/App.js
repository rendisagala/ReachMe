import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Explore from "./pages/Explore";
import SignUp from "./pages/SignUp";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

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
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;

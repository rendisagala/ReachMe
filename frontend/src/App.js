import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

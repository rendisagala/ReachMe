import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Feed from "./components/Feed/Feed";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SignIn from "./pages/SignIn";
import { useDispatch } from "react-redux";
import { loadUser } from "./Actions/User";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  return (
    <>
      <BrowserRouter>
        <div>
          {/* <NavigationBar /> */}
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

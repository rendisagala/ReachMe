import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed/Feed";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SignIn from "./pages/SignIn";

function App() {
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

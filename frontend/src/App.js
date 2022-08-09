import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <div>
          <NavigationBar />
        </div>
      </Router>
    </>
  );
}

export default App;

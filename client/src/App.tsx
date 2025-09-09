import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Link to="/signup">
        <Button className="cursor-pointer">signup</Button>
      </Link>
      <Link to="/signin">
        <Button className="cursor-pointer">signin</Button>
      </Link>
    </>
  );
}

export default App;

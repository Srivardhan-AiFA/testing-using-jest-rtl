import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const userData = useSelector((state: RootState) => state.user);
  console.log(userData.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

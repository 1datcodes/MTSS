import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Login system
import AuthStatus from "./Login System/AuthStatus";
import Login from "./Login System/Login";
import Signup from "./Login System/Signup";

// Pages
import HomePage from "./HomePage/HomePage";
import Resources from "./Resources/Resources";
import Supports from "./Supports/SupportPages";

import "./App.css";


function App() {
  return (
    <Router>
      <AuthStatus />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/supports" element={<Supports />} />
      </Routes>
    </Router>
  );
}

export default App;

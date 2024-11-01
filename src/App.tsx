import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import AuthStatus from "./Login System/AuthStatus";
import Login from "./Login System/Login";
import Signup from "./Login System/Signup";
import Resources from "./Resources/Resources";
import Supports from "./Supports/SupportPages";

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

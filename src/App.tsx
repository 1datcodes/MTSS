import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Login system
import AuthStatus from "./Login System/AuthStatus";
import Login from "./Login System/Login";
import Signup from "./Login System/Signup";
import Profile from "./Login System/Profile";

// Pages
import HomePage from "./HomePage/HomePage";
import Resources from "./Resources/Resources";
import Supports from "./Supports/SupportPages";

import "./App.css";

const pages = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/resources",
    element: <Resources />,
  },
  {
    path: "/supports",
    element: <Supports />,
  },
  {
    path: "/profile",
    element: localStorage.getItem("username") ? (
      <Profile />
    ) : (
      <Navigate to="/" />
    ),
  },
];

function App() {
  return (
    <Router>
      <AuthStatus />
      <Routes>
        {pages.map((page) => (
          <Route key={page.path} path={page.path} element={page.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Navbar from "../Tools/Navbar";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUsername: setAuthUsername } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const devPortID = import.meta.env.VITE_DEV_PORT;
      const res = await axios.post(
        `http://localhost:${devPortID}/api/auth/login`,
        {
          username,
          password,
        },
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username); // Store username in localStorage
      setMessage(res.data.msg); // Set success message
      setAuthUsername(username); // Set the username in AuthContext

      window.location.assign("/profile"); // Redirect to profile
    } catch (err) {
      console.error("Error:", err); // Debug log
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.msg
      ) {
        setMessage(err.response.data.msg); // Set error message from server
      } else {
        setMessage("Login failed. Please try again."); // Set generic error message
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="Content">
        <h1 className="Login-title">Login</h1>
        <form className="Login-form" onSubmit={handleSubmit}>
          <input
            className="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="Submit" type="submit">
            Login
          </button>
        </form>
        {message && <p className="Login-message">{message}</p>}{" "}
        {/* Display message */}
      </div>
    </div>
  );
};

export default Login;

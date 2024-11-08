import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Navbar from "../Tools/Navbar";
import "./Login.css";

// const devPortID = import.meta.env.VITE_DEV_PORT;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUsername: setAuthUsername, setAccess } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Username and password cannot be blank");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        // `http://localhost:${devPortID}/api/auth/register`,
        `${API_BASE_URL}/api/auth/register`,
        {
          username,
          password,
        },
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("access", res.data.access);

      setMessage(res.data.msg);
      setAuthUsername(username);
      setAccess(res.data.access);

      window.location.assign("/profile");
    } catch (err) {
      console.error(err);
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data &&
        err.response.data.msg
      ) {
        setMessage(err.response.data.msg);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="Content">
        <h1 className="Login-title">Sign Up</h1>
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
          <input
            className="ConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="Submit" type="submit">
            Sign Up
          </button>
        </form>
        {message && <p className="Login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;

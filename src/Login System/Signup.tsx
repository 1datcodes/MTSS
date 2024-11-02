import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Navbar from "../Tools/Navbar";
import "./Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUsername: setAuthUsername } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Username and password cannot be blank");
      return;
    }
    try {
      const devPortID = import.meta.env.VITE_DEV_PORT;
      const res = await axios.post(
        `http://localhost:${devPortID}/api/auth/register`,
        {
          username,
          password,
        },
      );
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.msg); // Set success message
      setAuthUsername(username); // Set the username in AuthContext
      // Optionally, redirect to home page or dashboard
    } catch (err) {
      console.error(err);
      setMessage((err as any).response.data.msg); // Set error message
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
          <button className="Submit" type="submit">Sign Up</button>
        </form>
        {message && <p className="Login-message">{message}</p>} {/* Display message */}
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Navbar from "./Tools/Navbar";

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
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>} {/* Display message */}
    </div>
  );
};

export default Signup;

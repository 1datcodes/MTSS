import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUsername: setAuthUsername } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted"); // Debug log
    try {
      const devPortID = import.meta.env.VITE_DEV_PORT;
      const res = await axios.post(`http://localhost:${devPortID}/api/auth/login`, {
        username,
        password,
      });
      // console.log("Response:", res.data); // Debug log
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.msg); // Set success message
      setAuthUsername(username); // Set the username in AuthContext
      console.log("Logged in as", username); // Debug log
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* Display message */}
    </div>
  );
};

export default Login;

import React from "react";
import { useAuth } from "./AuthContext";

const AuthStatus = () => {
  const { username } = useAuth();
  console.log("AuthStatus username:", username); // Debug log

  return (
    <div style={{ position: "fixed", top: 10, right: 10 }}>
      {username ? `Logged in as ${username}` : "Not logged in"}
    </div>
  );
};

export default AuthStatus;

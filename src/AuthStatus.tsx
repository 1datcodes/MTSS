import { useAuth } from "./AuthContext";

const AuthStatus = () => {
  const { username, setUsername } = useAuth();
  console.log("AuthStatus username:", username); // Debug log

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername(null);
  };

  return (
    <div style={{ position: "fixed", top: 10, right: 10 }}>
      {username ? (
        <>
          <div>Logged in as {username}</div>
          {username === "sheth shilpan" && <div>test</div>}
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        "Not logged in"
      )}
    </div>
  );
};

export default AuthStatus;

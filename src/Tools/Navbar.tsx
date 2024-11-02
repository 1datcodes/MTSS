import { useAuth } from "../Login System/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { username, setUsername } = useAuth();

  const handleLogging = () => {
    if (username) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      setUsername(null);
      window.location.assign("/");
    } else {
      window.location.assign("/login");
    }
  }

  return (
    <div className="Navbar">
      <button className="Home" onClick={() => window.location.assign("/")}>
        Home
      </button>
      <button
        className="Supports"
        onClick={() => window.location.assign("/supports")}
      >
        Supports
      </button>
      <button
        className="Resources"
        onClick={() => window.location.assign("/resources")}
      >
        Resources
      </button>
      <button
        className="Login"
        onClick={handleLogging}
      >
        {username ? "Logout" : "Login"}
      </button>
      <button
        className="Signup"
        onClick={() => window.location.assign("/signup")}
      >
        Signup
      </button>
    </div>
  );
};

export default Navbar;

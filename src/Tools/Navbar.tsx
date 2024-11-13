import { useAuth } from "../Login System/AuthContext";
import "./Navbar.css";
import logo from "../MTSS.png";

const Navbar = () => {
  const { username, setUsername, setAccess } = useAuth();

  const handleLogging = () => {
    if (username) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("access");
      setUsername(null);
      setAccess(null);
      window.location.assign("/");
    } else {
      window.location.assign("/login");
    }
  };

  const handleProfile = () => {
    if (username) {
      window.location.assign("/profile");
    } else {
      window.location.assign("/signup");
    }
  };

  return (
    <div className="Navbar">
      <button className="Home" onClick={() => window.location.assign("/")}>
        <img src={logo} class="logo" />
      </button>
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
      <button className="Login" onClick={handleLogging}>
        {username ? "Logout" : "Login"}
      </button>
      <button className="Signup" onClick={handleProfile}>
        {username ? username : "Signup"}
      </button>
    </div>
  );
};

export default Navbar;

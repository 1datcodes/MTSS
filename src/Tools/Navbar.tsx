import "./Navbar.css";

const Navbar = () => {
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
        onClick={() => window.location.assign("/login")}
      >
        Login
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

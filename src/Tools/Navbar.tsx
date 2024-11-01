import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="Navbar">
            <button className="Home">
                <Link to="/">Home</Link>
            </button>
            <button className="Supports">
                <Link to="/supports">Supports</Link>
            </button>
            <button className="Resources">
                <Link to="/resources">Resources</Link>
            </button>
            <button className="Login">
                <Link to="/login">Login</Link>
            </button>
            <button className="Signup">
                <Link to="/signup">Signup</Link>
            </button>
        </div>
    )
}

export default Navbar;
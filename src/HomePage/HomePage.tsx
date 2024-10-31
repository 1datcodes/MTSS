import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/resources">Resources</Link>
      <br />
      <Link to="/supports">Supports</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default HomePage;

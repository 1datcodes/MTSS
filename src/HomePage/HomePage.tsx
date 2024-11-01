import Editor from "../Tools/Editor";
import Navbar from "../Tools/Navbar";

function HomePage() {
  return (
    <div className="HomePage">
      <Navbar />
      <Editor pageName="HomePage" />
    </div>
  );
}

export default HomePage;

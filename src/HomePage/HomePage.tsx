import Editor from "../Tools/Editor";
import Navbar from "../Tools/Navbar";

function HomePage() {
  const access = localStorage.getItem("access");

  return (
    <div className="HomePage">
      <Navbar />
      {access === "admin" ? (
        <Editor pageName="HomePage" />
      ) : (
        <div className="Content" dangerouslySetInnerHTML={{ __html: localStorage.getItem("HomePage") || "" }} />
      )}
    </div>
  );
}

export default HomePage;

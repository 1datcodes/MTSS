import Editor from "../Tools/Editor";
import Navbar from "../Tools/Navbar";

function Resources() {
  const access = localStorage.getItem("access");

  return (
    <div className="Resources">
      <Navbar />
      {access === "admin" ? (
        <Editor pageName="Resources" />
      ) : (
        <div className="Content" dangerouslySetInnerHTML={{ __html: localStorage.getItem("Resources") || "" }} />
      )}
    </div>
  );
}

export default Resources;

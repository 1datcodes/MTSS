import Editor from "../Tools/Editor";
import Navbar from "../Tools/Navbar";

function Supports() {
  const access = localStorage.getItem("access");

  return (
    <div className="Supports">
      <Navbar />
      {access === "admin" ? (
        <Editor pageName="Supports" />
      ) : (
        <div className="Content" dangerouslySetInnerHTML={{ __html: localStorage.getItem("Supports") || "" }} />
      )}
    </div>
  );
}

export default Supports;

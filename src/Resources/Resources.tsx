import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "../Tools/Editor";
import Navbar from "../Tools/Navbar";

function Resources() {
  const access = localStorage.getItem("access");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const devPortID = import.meta.env.VITE_DEV_PORT;
        const res = await axios.get(
          `http://localhost:${devPortID}/api/auth/get-content`,
          {
            params: { pageName: "Resources" },
          },
        );
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="Resources">
      <Navbar />
      {access === "admin" ? (
        <Editor pageName="Resources" />
      ) : (
        <div
          className="Content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}

export default Resources;

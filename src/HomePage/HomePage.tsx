import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "../Tools/Editor";
import Navbar from "../Tools/Navbar";

// const devPortID = import.meta.env.VITE_DEV_PORT;
const API_BASE_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const access = localStorage.getItem("access");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          // `http://localhost:${devPortID}/api/auth/get-content`,
          `${API_BASE_URL}/api/auth/get-content`,
          {
            params: { pageName: "HomePage" },
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
    <div className="HomePage">
      <Navbar />
      {access === "admin" ? (
        <Editor pageName="HomePage" />
      ) : (
        <div
          className="Content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}

export default HomePage;

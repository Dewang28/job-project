import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      const res = await api.get("/files");
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files", err);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      await api.post("/files/upload", formData);
      setSelectedFile(null);
      fetchFiles();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container">
      <h2>📁 File Upload</h2>

      <div className="upload-box">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <h3>Uploaded Files</h3>

      {files.length === 0 ? (
        <p>No files uploaded yet</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <a href={file.fileUrl} target="_blank" rel="noreferrer">
                {file.fileUrl}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

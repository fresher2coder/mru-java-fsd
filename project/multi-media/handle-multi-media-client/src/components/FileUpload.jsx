import { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/files");
      setFiles(res.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !file)
      return alert("All fields are required!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "user",
      new Blob([JSON.stringify(user)], { type: "application/json" })
    );

    console.log(formData.get("file"));
    console.log(formData.get("user"));

    try {
      await axios.post("http://localhost:8080/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser({ name: "", email: "" });
      setFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/files/${id}`);
      fetchFiles();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Enter Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />

        <label className="file-drop-zone">
          Drag & Drop your file here or
          <label className="file-label">
            Click to Select
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
              required
            />
          </label>
        </label>

        {file && <p className="selected-file">📁 Selected File: {file.name}</p>}

        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>

      <h3>Uploaded Files</h3>
      <ul className="file-list">
        {files.map((file) => (
          <li key={file.id} className="file-item">
            <span>
              {file.fileName} ({file.fileType})
            </span>
            <span className="file-actions">
              <a href={`http://localhost:8080/${file.filePath}`} download>
                Download
              </a>
              <button
                className="delete-btn"
                onClick={() => handleDelete(file.id)}
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;

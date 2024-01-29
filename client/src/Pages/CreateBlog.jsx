/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./CreateBlog.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const CreateBlog = () => {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    blogBody: "",
    category: "others",
    cover: "",
    userRef: "",
  });

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  console.log(currentUser);
  console.log(formData);

  const handleFileUpload = (file) => {
    setUploading(true);
    if (file) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.ceil(progress));
        },
        (err) => {
          setFileUploadError(err);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, cover: downloadURL });
          });
        }
      );
      setUploading(false);
    } else {
      setFileUploadError("upload a cover image");
      setUploading(false);
    }
  };

  const handleDeleteCover = () => {
    setFormData({ ...formData, cover: undefined });
  };

  //-----------------------------------------------------------------------------------------
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  //----------------------------------------------------------------------------------------------------------------

  const handleChange = (e) => {
    if (
      e.target.id === "technology" ||
      e.target.id === "lifestyle" ||
      e.target.id === "business_and_finance" ||
      e.target.id === "entertainment" ||
      e.target.id === "science_and_education" ||
      e.target.id === "personal" ||
      e.target.id === "others"
    ) {
      setFormData({
        ...formData,
        category: e.target.id,
      });
    }

    if (e.target.type === "text") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.cover == "") {
        return setError("you must upload cover image");
      }

      setLoading(true);
      setError(false);

      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success == false) {
        setError(data.message);
      }

      navigate(`/blog/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="createBlogPage">
      <h1>
        Create a <span style={{ color: "#ED5AB3" }}>Blog</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          id="title"
          onChange={handleChange}
        />
        <input
          style={{ fontSize: "1rem" }}
          type="text"
          placeholder="Summary"
          id="summary"
          onChange={handleChange}
        />
        <div className="imageBox">
          <input
            style={{ cursor: "pointer" }}
            type="file"
            accept="image/*"
            placeholder="cover image"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={() => handleFileUpload(file)}
            className="imgBtn"
            type="button"
            disabled={uploading}
          >
            {uploading ? "uploading..." : "UPLOAD"}
          </button>
        </div>
        <p style={{ color: "red", fontSize: "1rem" }}>
          {fileUploadError && fileUploadError}
        </p>
        {formData.cover && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.4rem",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ED5AB3",
              borderRadius: "10px",
              padding: "0.1rem 0.3rem",
              margin: "0.5rem 0",
              backgroundColor: "transparent",
            }}
          >
            <img
              src={formData.cover}
              alt="cover image"
              style={{
                width: "10rem",
                height: "8rem",
                objectFit: "cover",
                marginBottom: "0.5rem",
              }}
            />

            <button
              type="button"
              style={{
                color: "red",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "1.3rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={handleDeleteCover}
            >
              {" "}
              DELETE{" "}
            </button>
          </div>
        )}

        <ReactQuill
          modules={modules}
          theme="snow"
          style={{
            color: "black",
            backgroundColor: "white",
            padding: "0",
            border: "1px solid #ED5AB3",
            width: "70%",
            marginBottom: "4rem",
          }}
          onChange={(value) => setFormData({ ...formData, blogBody: value })}
          id="blogBody"
        />

        <div className="category" style={{ marginTop: "2rem" }}>
          <label htmlFor="dropdown">Select the category for your blog:</label>

          <div className="categoryArea">
            <div className="typeOptions">
              <input
                type="radio"
                id="technology"
                name="type"
                onChange={handleChange}
                checked={formData.category == "technology"}
              />
              <span>TECHNOLOGY</span>
            </div>

            <div className="typeOptions">
              <input
                type="radio"
                id="lifestyle"
                name="type"
                onChange={handleChange}
                checked={formData.category == "lifestyle"}
              />
              <span>LIFESTYLE</span>
            </div>

            <div className="typeOptions">
              <input
                type="radio"
                id="business_and_finance"
                name="type"
                onChange={handleChange}
                checked={formData.category == "business_and_finance"}
              />
              <span>BUSINESS & FINANCE</span>
            </div>

            <div className="typeOptions">
              <input
                type="radio"
                id="entertainment"
                name="type"
                onChange={handleChange}
                checked={formData.category == "entertainment"}
              />
              <span>ENTERTAINMENT</span>
            </div>

            <div className="typeOptions">
              <input
                type="radio"
                id="science_and_education"
                name="type"
                onChange={handleChange}
                checked={formData.category == "science_and_education"}
              />
              <span>SCIENCE AND EDUCATION</span>
            </div>

            <div className="typeOptions">
              <input
                type="radio"
                id="personal"
                name="type"
                onChange={handleChange}
                checked={formData.category == "personal"}
              />
              <span>PERSONAL</span>
            </div>

            <div className="typeOptions">
              <input
                type="radio"
                id="others"
                name="type"
                onChange={handleChange}
                checked={formData.category == "others"}
              />
              <span>OTHERS</span>
            </div>
          </div>
        </div>

        <button disabled={loading || uploading}>
          {loading ? "publishing..." : "PUBLISH"}
        </button>

        {error && <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;

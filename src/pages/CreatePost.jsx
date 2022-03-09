import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, realtimeDB, storage } from "../firebase-config";
import { ref, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storRef,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";

function CreatePost({ isAuth }) {
  const uuid = uid();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);

  const postCollectionRef = collection(db, "posts");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  });

  const createPost = async () => {
    // realtime
    await set(ref(realtimeDB, "posts/" + uuid), {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
      uuid,
    });
    uploadFile(file, uuid);
    // firestore
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    alert("Post created successfully");
    navigate("/");
  };

  const uploadFile = (file, uuid) => {
    if (!file) return;
    const storageRef = storRef(storage, `/posts/${uuid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.storRef).then((url) =>
          console.log(url)
        );
      }
    );
  };

  const imgHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create Post</h1>
        <div className="inputGp">
          <label htmlFor="">Title:</label>
          <input
            type="text"
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Post</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Post..."
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
        </div>
        <div className="imgGp">
          <label htmlFor="">Image</label>
          <input type="file" onChange={imgHandler} />
          <p>Upload Progress {progress}</p>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;

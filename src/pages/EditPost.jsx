import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { realtimeDB } from "../firebase-config";

function EditPost() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `posts/${params.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.val());
          setTitle(post.title);
          setDesc(post.postText);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updatePost = () => {
    // console.log(title, desc);
    update(ref(realtimeDB, `/posts/${params.id}`), {
      ...post,
      title,
      postText: desc,
    });
    setTitle("");
    setDesc("");
    alert("Post has been updated successfully");
    navigate("/");
  };
  return (
    <div className="post-container">
      <div className="title">
        <h3>Title</h3>
        <input
          type="text"
          defaultValue={post.title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="desc">
        <h3>Description</h3>
        <input
          type="text"
          defaultValue={post.postText}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button onClick={updatePost}>Update Post</button>
    </div>
  );
}

export default EditPost;

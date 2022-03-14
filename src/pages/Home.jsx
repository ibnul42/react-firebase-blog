import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import GoogleContext from "../Context/GoogleContext";
import { db, realtimeDB, storage } from "../firebase-config";
import { auth } from "../firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { ref as storRef, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

function Home({ isAuth }) {
  const navigate = useNavigate();
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const { loggedUser } = useContext(GoogleContext);

  const starsRef = storRef(storage, "posts/a8df9ba1471.png");

  useEffect(() => {
    getDownloadURL(starsRef)
      .then((url) => {
        console.log("url", url);
        // Insert url into an <img> tag to "download"
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });

    // realtime db
    onValue(ref(realtimeDB, "posts/"), (snapshot) => {
      setPostLists([]);
      const data = snapshot.val();
      // console.log(data);
      if (data !== null) {
        Object.values(data).map((data) => {
          // console.log(data);
          setPostLists((oldArray) => [...oldArray, data]);
        });
      }
      // setPostLists(data.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data);
    });

    // firestore db
    // const getPosts = async () => {
    //   const res = await getDocs(postsCollectionRef);
    // console.log(res.docs);
    // console.log(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getPosts();
  }, []);

  // realtime delete
  const deletePost = (id) => {
    console.log(id);
    remove(ref(realtimeDB, `/posts/${id}`));
  };

  // firestore delete
  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "posts", id);
  //   await deleteDoc(postDoc);
  // };

  // realtime edit post
  const editHandler = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="homePage">
      {postLists.length === 0 ? (
        <p>No post</p>
      ) : (
        postLists.map((post, id) => {
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={post.imageUrl} />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.postText}</Card.Text>
              <Card.Text>@{post.author.name}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <div className="deletePost">
              {((isAuth && post.author.id === auth.currentUser.uid) ||
                loggedUser.role === "admin") && (
                <div>
                  <button
                    onClick={() => {
                      deletePost(post.uuid);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                  <button onClick={() => editHandler(post.uuid)}>Edit</button>
                </div>
              )}
            </div>
          </Card>;
        })
      )}
    </div>
  );
}

export default Home;

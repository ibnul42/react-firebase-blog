import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import GoogleContext from '../Context/GoogleContext';
import { db } from '../firebase-config';
import { auth } from '../firebase-config';

function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, 'posts');
  const { loggedUser } = useContext(GoogleContext);


  useEffect(() => {
    const getPosts = async () => {
      const res = await getDocs(postsCollectionRef);
      setPostLists(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
  }

  return (
    <div className="homePage">
      {postLists.map((post, id) => {
        return (
          <div key={id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {(isAuth && post.author.id === auth.currentUser.uid || loggedUser.role === 'admin') && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  )
}

export default Home;
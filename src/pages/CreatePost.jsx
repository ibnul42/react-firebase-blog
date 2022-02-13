import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');

  const postCollectionRef = collection(db, 'posts');

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
    })
     .then((result) => {
       console.log(result);
     })
     .catch((err) => {
       console.log(err);
     })
  }
  return (
    <div className='createPostPage'>
      <div className="cpContainer">
        <h1>Create Post</h1>
        <div className="inputGp">
          <label htmlFor="">Title:</label>
          <input type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="inputGp">
          <label htmlFor="">Post</label>
          <textarea name="" id="" cols="30" rows="10" placeholder="Post..." onChange={(e) => setPostText(e.target.value)} ></textarea>
        </div>
        <button onClick={createPost} >Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost;
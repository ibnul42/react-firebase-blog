import { signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleContext from '../Context/GoogleContext';
import { auth, db, googleProvider } from '../firebase-config';

function Login({ setIsAuth, signedUser, setSignedUser }) {
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: ''
  });
  let newUser = 1;

  const { loggedUser, setLoggedUser } = useContext(GoogleContext);

  const navigate = useNavigate();
  const userCollectionRef = collection(db, 'users');

  useEffect(() => {
    getUsers();
  }, [userList])

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUserList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const signInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // setLoggedUser({
        //   name: result.user.displayName,
        //   email: result.user.email,
        //   role: 'user'
        // });
        dbUser(result);
        setIsAuth(true);
        localStorage.setItem('isAuth', true);
      })
      .catch((err) => {
      })
  }

  const dbUser = (result) => {
    userList.map((user) => {
      if (user.email === result.user.email) {
        newUser = 0;
        setLoggedUser({
          email: user.email,
          name: user.name,
          role: user.role,
        })
      }
    })
    if (newUser === 1) {
      createUser(result.user);
    }
    navigate('/');
  }

  const createUser = async (result) => {
    await addDoc(userCollectionRef, {
      name: result.displayName,
      email: result.email,
      role: 'user'
    })
  }

  return (
    <div className="loginPage">
      <p>Sign in with Google</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign In</button>
    </div>
  )
}

export default Login
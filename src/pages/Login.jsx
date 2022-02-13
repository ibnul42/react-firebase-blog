import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase-config';

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setIsAuth(true);
        localStorage.setItem('isAuth', true);
        console.log(result.user);
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
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
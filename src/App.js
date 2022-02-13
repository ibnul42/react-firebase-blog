import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/NotFound';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        localStorage.clear();
        window.location.pathname = '/';
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/create-post'>Create Post</Link>
        {!isAuth ? <Link to='/login'>Login</Link> : <Link to='/' onClick={signOutUser}>Logout</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
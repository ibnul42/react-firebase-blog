import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Header from "./Layout/Homepage/Header/Header";
import Footer from "./Layout/Homepage/Footer/Footer";
import { GoogleProvider } from "./Context/GoogleContext";
import AllUser from "./Admin/AllUser";
import ProtectedRoute from "./ProtectedRoute";
import EditUser from "./Admin/EditUser";
import EditPost from "./pages/EditPost";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [signedUser, setSignedUser] = useState({
    email: "",
    name: "",
    role: "user",
  });

  return (
    <GoogleProvider>
      <div className="d-flex flex-column justify-content-between viewport-sc">
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuth={setIsAuth}
                signedUser={signedUser}
                setSignedUser={setSignedUser}
              />
            }
          />
          <Route path="/create-post" element={<CreatePost isAuth={isAuth} />} />
          <Route
            path="/all-users"
            element={
              <ProtectedRoute>
                <AllUser />
              </ProtectedRoute>
            }
          />
          <Route path="/user/:id" element={<EditUser />} />
          <Route path="/post/:id" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </GoogleProvider>
  );
}

export default App;

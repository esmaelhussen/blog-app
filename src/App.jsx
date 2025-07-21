import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPosts from "./pages/MyPosts";
import PostView from "./pages/PostView";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="p-4 bg-gray-100 flex justify-between items-center">
      <Link to="/">Home</Link>
      <nav className="space-x-4">
        {user ? (
          <>
            <Link to="/my-posts">My Posts</Link>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/my-posts"
              element={
                <AuthRoute>
                  <MyPosts />
                </AuthRoute>
              }
            />
            <Route path="/post/:id" element={<PostView />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

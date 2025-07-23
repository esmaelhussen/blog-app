import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPosts from "./pages/MyPosts";
import PostView from "./pages/PostView";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

function Navigation() {
  const { user, logout } = useContext(AuthContext);

  const linkClass =
    "text-gray-600 hover:text-purple-600 font-medium transition";

  const activeClass = "text-purple-700 font-semibold";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          📰 Blogify
        </Link>
        <nav className="space-x-6">
          {user ? (
            <>
              <NavLink
                to="/my-posts"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                My Posts
              </NavLink>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/blog-app">
        <Navigation />
        <main className="p-4 sm:p-8">
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

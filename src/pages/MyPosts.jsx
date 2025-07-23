import React from "react";
import { getBlogs, saveBlogs } from "../utils/storage";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

export default function MyPosts() {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = React.useState(getBlogs());
  const myBlogs = blogs.filter((b) => b.author === user.username);

  const refresh = () => setBlogs(getBlogs());
  const handleDelete = (id) => {
    saveBlogs(blogs.filter((b) => b.id !== id));
    refresh();
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-blue-200 to-purple-200 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8"
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-6">📝 My Posts</h1>

        <BlogForm onSubmit={refresh} />

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Posts
          </h2>

          {myBlogs.length === 0 ? (
            <p className="text-gray-600">You haven't posted anything yet.</p>
          ) : (
            myBlogs.map((post) => (
              <motion.div
                key={post.id}
                className="bg-gray-50 p-5 rounded-lg shadow-sm mb-4 border border-gray-200"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h3>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="text-red-500 hover:text-red-600 transition flex items-center gap-1"
                    onClick={() => handleDelete(post.id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>

                <div className="mt-4">
                  <BlogForm existing={post} onSubmit={refresh} />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

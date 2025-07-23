import React, { useState } from "react";
import { getBlogs } from "../utils/storage";
import BlogList from "../components/BlogList";
import { motion } from "framer-motion";
import { FaRegSmileBeam } from "react-icons/fa";

export default function Home() {
  const posts = getBlogs();
  const [name, setName] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-blue-200 to-purple-200 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Welcome Card */}
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mb-8"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-3xl font-bold text-purple-700 flex items-center gap-2 mb-2">
          <FaRegSmileBeam className="text-purple-500" />
          Welcome to the Blog System!
        </h1>
        <p className="text-gray-700 mb-4">
          Stay updated with the latest posts from our authors.
        </p>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter your name..."
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition text-gray-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setShowGreeting(true)}
          />
          {showGreeting && name && (
            <motion.p
              className="mt-3 text-lg font-medium text-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              👋 Hello, <span className="font-semibold">{name}</span>! Enjoy
              reading 🚀
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Blog Post List */}
      <motion.div
        className="w-full max-w-3xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          📝 All Blog Posts
        </h2>
        <BlogList posts={posts} />
      </motion.div>
    </motion.div>
  );
}

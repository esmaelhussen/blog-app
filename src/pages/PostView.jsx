import React from "react";
import { useParams } from "react-router-dom";
import { getBlogs } from "../utils/storage";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

export default function PostView() {
  const { id } = useParams();
  const post = getBlogs().find((b) => b.id === Number(id));
  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 to-purple-200">
        <p className="text-xl font-semibold text-red-600">Post not found 😢</p>
      </div>
    );

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 to-purple-200 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.article
        className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <FaUser className="text-purple-400" />
          <span>by {post.author}</span>
        </div>

        <div className="space-y-4 text-gray-800 leading-relaxed">
          {post.body.split("\n").map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </motion.article>
    </motion.div>
  );
}

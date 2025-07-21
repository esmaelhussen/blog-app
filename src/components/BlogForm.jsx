import React, { useState, useContext } from "react";
import { getBlogs, saveBlogs } from "../utils/storage";
import { AuthContext } from "../contexts/AuthContext";

export default function BlogForm({ existing, onSubmit }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(existing?.title || "");
  const [body, setBody] = useState(existing?.body || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogs = getBlogs();
    if (existing) {
      const updated = blogs.map((b) =>
        b.id === existing.id ? { ...b, title, body } : b
      );
      saveBlogs(updated);
    } else {
      const newPost = { id: Date.now(), author: user.username, title, body };
      saveBlogs([...blogs, newPost]);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2"
      />
      <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        className="w-full border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {existing ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}

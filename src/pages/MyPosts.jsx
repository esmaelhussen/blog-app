import React from "react";
import { getBlogs, saveBlogs } from "../utils/storage";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

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
    <div>
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>
      <BlogForm onSubmit={refresh} />
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Your Posts</h2>
        {myBlogs.map((post) => (
          <div key={post.id} className="p-4 border rounded my-2">
            <h3 className="font-bold">{post.title}</h3>
            <button
              className="text-red-500 mr-2"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
            <BlogForm existing={post} onSubmit={refresh} />
          </div>
        ))}
      </div>
    </div>
  );
}

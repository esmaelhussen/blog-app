import React from "react";
import { Link } from "react-router-dom";

export default function BlogList({ posts }) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded">
          <Link to={`/post/${post.id}`} className="text-xl font-semibold">
            {post.title}
          </Link>
          <p className="text-sm text-gray-600">by {post.author}</p>
          <p className="mt-2 text-gray-800">{post.body.slice(0, 100)}…</p>
        </div>
      ))}
    </div>
  );
}

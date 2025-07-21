import React from "react";
import { useParams } from "react-router-dom";
import { getBlogs } from "../utils/storage";

export default function PostView() {
  const { id } = useParams();
  const post = getBlogs().find((b) => b.id === Number(id));
  if (!post) return <p>Post not found</p>;

  return (
    <article className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-6">by {post.author}</p>
      <div className="space-y-4">
        {post.body.split("\n").map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </article>
  );
}

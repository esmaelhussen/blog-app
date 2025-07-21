import React from "react";
import { getBlogs } from "../utils/storage";
import BlogList from "../components/BlogList";

export default function Home() {
  const posts = getBlogs();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Blog Posts</h1>
      <BlogList posts={posts} />
    </div>
  );
}

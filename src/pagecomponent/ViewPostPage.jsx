import { NavBar, Footer } from "@/component/semantic";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export function ViewPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://blog-post-project-api.vercel.app/posts/${postId}`
        );
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Error fetching post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <>
      <NavBar />
        <div className="p-6">
          <h1 className=" text-left text-3xl font-semibold mb-4"><ReactMarkdown>{post.title}</ReactMarkdown></h1>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-md"
          />
          <div className=" text-left mt-4 text-lg"><ReactMarkdown>{post.content}</ReactMarkdown></div>
          <div className="mt-4 text-sm text-gray-600">
            <span>{post.author}</span> |{" "}
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>
      <Footer />
    </>
  );
}

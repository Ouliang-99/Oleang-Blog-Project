import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { NavBar, Footer } from "@/component/semantic";
import {
  CopyIcon,
  HappyFaceIcon,
  FacebookIconColor,
  LinkedinIconColor,
  TwitterIconColor,
  XIcon,
} from "@/component/icon";
import { useNavigate } from "react-router-dom";

export function ViewPostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    }
  };

  const handleSendClick = () => {
    if (!isLoggedIn) {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <>
      <NavBar />
      <div className="p-6">
        <h1 className="text-left text-3xl font-semibold mb-4">
          <ReactMarkdown>{post.title}</ReactMarkdown>
        </h1>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-80 object-cover rounded-md"
        />
        <div className="text-left mt-4 text-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <span>{post.author}</span> |{" "}
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex justify-between items-center bg-Brown-200 p-6 rounded-2xl gap-2">
        <button
          onClick={handleLike}
          className="gap-2 flex items-center bg-white space-x-4 mr-auto border border-black p-2 px-6 rounded-3xl hover:bg-slate-100"
        >
          <HappyFaceIcon />
          {post.likes}
        </button>
        <button
          onClick={copyToClipboard}
          className="flex items-center bg-white border border-black p-2 px-6 rounded-3xl hover:bg-slate-100"
        >
          <CopyIcon />
          Copy
        </button>
        <button
          onClick={() => window.open("https://www.facebook.com/", "_blank")}
        >
          <FacebookIconColor />
        </button>
        <button>
          <LinkedinIconColor />
        </button>
        <button>
          <TwitterIconColor />
        </button>
      </div>
      <p className="text-left font-semibold text-xl mt-4">Comment</p>
      <textarea
        placeholder="What are your thoughts?"
        className="mt-6 p-5 pt-4 border border-brown-400 rounded-2xl w-full h-28 resize-none placeholder:text-left placeholder:top-0"
      />
      <div className="w-full flex justify-end items-end">
        <button
          onClick={handleSendClick}
          className="bg-black text-white px-10 py-2 rounded-3xl m-4"
        >
          Send
        </button>
      </div>
      <Footer />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-xl px-6 py-20 text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-7 right-7 text-black"
            >
              <XIcon />
            </button>
            <h2 className="mx-20 text-4xl font-semibold">
              Create an account to
            </h2>
            <h2 className="mx-20 text-4xl font-semibold">continue</h2>
            <button
              onClick={() => navigate("/signup")}
              className="bg-black text-white px-8 py-4 rounded-full my-10"
            >
              Create an account
            </button>
            <div className="flex justify-center gap-4">
              <p className="text-Brown-400">Already have an account?</p>
              <button
                onClick={() => navigate("/login")}
                className="font-semibold underline"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="text-left fixed bottom-4 right-4 bg-green-500 text-white p-6 rounded-md shadow-md">
          <h1>Copied!</h1>
          <p>This article has been copied to your clipboard.</p>
        </div>
      )}
    </>
  );
}

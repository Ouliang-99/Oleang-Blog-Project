import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/config/axios";
import ReactMarkdown from "react-markdown";
import { useUser } from "@/contexts/UserContext";
import { NavBar, Footer } from "@/component/semantic";
import {
  CopyIcon,
  HappyFaceIcon,
  FacebookIconColor,
  LinkedinIconColor,
  TwitterIconColor,
  XIcon,
  LikedHappyFaceIcon,
} from "@/component/icon";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";
import formatDate from "@/lib/formatdate";

export function ViewPostPage() {
  const { postId } = useParams();
  const { user, setUser } = useUser();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCommentAlert, setShowCommentAlert] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setError("");

      try {
        // First, fetch the post data
        const postResponse = await api.get(`/api/posts/${postId}`);
        
        if (postResponse.status === 200 && postResponse.data.success) {
          setPost(postResponse.data.data);
          setLikesCount(postResponse.data.data.likes_count);
        } else {
          setError("Failed to fetch post details");
          return;
        }

        // Fetch comments
        const commentResponse = await api.get(`/api/comments/${postId}`);
        if (commentResponse.status === 200 && commentResponse.data.success) {
          setComments(commentResponse.data.comments);
        }

        // Only check likes if user is logged in
        if (user?.id) {
          const likeResponse = await api.post("/api/isLiked", {
            user_id: user.id,
            post_id: postId,
          });

          if (likeResponse.status === 200 && likeResponse.data.success) {
            setIsLiked(likeResponse.data.isLiked);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId, user?.id]); // Changed dependency to user?.id

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleLike = async () => {
    if (!user?.id) {
      setShowModal(true);
      return;
    }

    try {
      const response = await api.post("/api/likes", {
        user_id: user.id,
        post_id: postId,
      });

      if (response.data.success) {
        setIsLiked(true);
        setLikesCount((prevCount) => prevCount + 1);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await api.post("/api/unlike", {
        user_id: user.id,
        post_id: postId,
      });

      if (response.data.success) {
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      }
    } catch (err) {
      console.error("Error unliking post:", err);
    }
  };

  const commentAlert = async () => {
    try {
      setShowCommentAlert(true);
      setTimeout(() => setShowCommentAlert(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSendClick = async () => {
    if (!user?.id) {
      setShowModal(true);
      return;
    }

    try {
      await api.post(`/api/comments/${postId}`, {
        user_id: user.id,
        comment_text: commentText,
      });

      setComments((prevComments) => [
        ...prevComments,
        {
          comment_text: commentText,
          created_at: new Date(),
          users: {
            name: user.name,
            profile_pic: user.profile_pic,
          },
        },
      ]);

      setCommentText("");
      setShowCommentAlert(true);
      setTimeout(() => setShowCommentAlert(false), 3000);
    } catch (error) {
      console.error("Error cannot comment:", error);
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  const MarkdownRenderer = ({ content }) => {
    if (!content) return null;

    return (
      <div className="prose prose-lg text-left max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content.replace(/\\n/g, "\n")}
        </ReactMarkdown>
      </div>
    );
  };

  if (loading)
    return (
      <div className="absolute inset-0 bg-[#FFFFFF] bg-opacity-20 flex items-center justify-center z-10">
        <div className="loader border-t-4 border-Brown-600 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <>
      <NavBar />
      <div className="p-6 sm:px-32 sm:py-10">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[40rem] object-cover rounded-md"
        />
        <div className="items-center mt-4 text-sm text-gray-600">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {post.categories.name}
          </span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <h1 className="text-left text-3xl font-semibold my-8">{post.title}</h1>
        <div className="prose prose-lg text-left mt-4">
          <MarkdownRenderer content={post.content} />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <span>OLEANG</span> | <span>Edit At</span> |{" "}
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center bg-brown-200 p-6 rounded-2xl gap-2 min-w-80 sm:px-32">
        {!user ? (
          <button
            onClick={handleLike}
            className="mb-2 sm:mb-0 w-full justify-center sm:w-28 gap-2 flex items-center bg-white space-x-4 border border-black p-2 px-6 rounded-3xl hover:bg-slate-200"
          >
            <HappyFaceIcon />
            {likesCount}
          </button>
        ) : isLiked ? (
          <button
            onClick={handleUnlike}
            className="mb-2 sm:mb-0 w-full justify-center sm:w-28 gap-2 flex items-center bg-Brown-500 space-x-4 border text-white border-black p-2 px-6 rounded-3xl hover:bg-slate-400"
          >
            <LikedHappyFaceIcon />
            {likesCount}
          </button>
        ) : (
          <button
            onClick={handleLike}
            className="mb-2 sm:mb-0 w-full justify-center sm:w-28 gap-2 flex items-center bg-white space-x-4 border border-black p-2 px-6 rounded-3xl hover:bg-slate-200"
          >
            <HappyFaceIcon />
            {likesCount}
          </button>
        )}

        <div className="flex gap-2 w-full sm:w-auto justify-between">
          <button
            onClick={copyToClipboard}
            className="flex items-center bg-white border border-black p-2 px-6 rounded-3xl hover:bg-slate-200"
          >
            <CopyIcon />
            Copy
          </button>
          <button
            onClick={() => window.open("https://www.facebook.com/", "_blank")}
            className="flex items-center"
            aria-label="Share on Facebook"
          >
            <FacebookIconColor />
          </button>
          <button
            onClick={() => window.open("https://th.linkedin.com/", "_blank")}
            className="flex items-center"
            aria-label="Share on LinkedIn"
          >
            <LinkedinIconColor />
          </button>
          <button
            onClick={() => window.open("https://x.com/", "_blank")}
            className="flex items-center"
            aria-label="Share on Twitter"
          >
            <TwitterIconColor />
          </button>
        </div>
      </div>
      <div className="sm:px-32">
        <p className="text-left font-semibold text-xl mt-4">Comment</p>
        <textarea
          onChange={handleInputChange}
          type="text"
          placeholder="What are your thoughts?"
          className="mt-6 p-5 pt-4 border border-brown-400 rounded-2xl w-full h-28 resize-none placeholder:text-left outline-none"
        />
        <div className="w-full flex justify-end items-end">
          <button
            onClick={handleSendClick}
            className="bg-black text-white px-10 py-2 rounded-3xl m-4"
          >
            Send
          </button>
        </div>
      </div>
      <div className="sm:px-32">
        {comments &&
          comments.map((comments, index) => (
            <div key={index} className="border-b-2 mb-10 py-5">
              <div className="flex gap-6">
                <div>
                  <img
                    className="w-16 h-16 object-cover rounded-full"
                    src={comments.users.profile_pic}
                    alt="comment_profile"
                  />
                </div>
                <div className="flex-col">
                  <p className="text-xl font-semibold">{comments.users.name}</p>
                  <p className="text-sm font-medium text-[#75716B]">
                    {formatDate(comments.created_at)}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <p className="text-[#75716B]">{comments.comment_text}</p>
              </div>
            </div>
          ))}
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
      {showCommentAlert && (
        <div className="text-left fixed bottom-4 right-4 bg-green-500 text-white p-6 rounded-md">
          <h1>Success!</h1>
          <p>Your comment have been submited.</p>
        </div>
      )}

      {showAlert && (
        <div className="text-left fixed bottom-4 right-4 bg-green-500 text-white p-6 rounded-md">
          <h1>Copied!</h1>
          <p>This article has been copied to your clipboard.</p>
        </div>
      )}
    </>
  );
}

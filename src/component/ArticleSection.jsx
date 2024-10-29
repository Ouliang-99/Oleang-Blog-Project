import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/component/icon";

export function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [activeIndex, setActiveIndex] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitPage, setLimitPage] = useState(6);
  const [keywordQuery, setKeywordQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const loadMorePost = (event) => {
    event.preventDefault();
    const newLimit = limitPage + 6;
    setLimitPage(newLimit);
    fetchPosts(activeIndex, 1, newLimit);
  };

  const fetchPosts = async (category = "", page = 1, limit = limitPage) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://blog-post-project-api.vercel.app/posts?keyword=${keywordQuery}`,
        {
          params: {
            category,
            page,
            limit,
          },
        }
      );
      setBlogPosts(response.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query) => {
    if (query) {
      try {
        const response = await axios.get(
          `https://blog-post-project-api.vercel.app/posts?keyword=${query}`
        );
        setSearchResults(response.data.posts || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchPosts(activeIndex, 1, limitPage);
  }, [keywordQuery, activeIndex, limitPage]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setKeywordQuery(value);
    searchPosts(value);
  };

  const handleCategoryClick = (category) => {
    setActiveIndex(category);
    setLimitPage(6);
    fetchPosts(category.toLowerCase(), 1, 6);
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 className="flex text-xl font-semibold py-5">Latest articles</h1>
      <div className="bg-Brown-200 p-6 hidden sm:block">
        <Menubar className="flex justify-between items-center">
          <div className="flex space-x-4">
            {categories.map((category, index) => (
              <MenubarMenu key={index}>
                <MenubarTrigger
                  onClick={() => handleCategoryClick(category)}
                  className={`${
                    activeIndex === category
                      ? "bg-Brown-500 text-white"
                      : "bg-transparent hover:bg-Brown-300"
                  } transition-colors duration-200 active:bg-Brown-500`}
                >
                  {category}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </div>
          <div className="flex flex-col relative">
            <Input
              onChange={handleSearchChange}
              className="pr-10"
              type="text"
              placeholder="Search"
            />
            {searchResults.length > 0 && keywordQuery && (
              <div className="absolute z-10 top-10 bg-white w-full border border-gray-300">
                {searchResults.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate(`/posts/${post.id}`)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {post.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Menubar>
      </div>

      <div className="bg-Brown-200 flex justify-center pt-5 sm:hidden">
        <Card className="w-[400px]">
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 mt-9">
                  <div className="relative">
                    <Input className="pr-10" type="text" placeholder="Search" />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 4a6 6 0 100 12 6 6 0 000-12zM16 16l4 4"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 text-left">
                  <Label htmlFor="category">Select a category</Label>
                  <Select
                    onValueChange={(value) => {
                      handleCategoryClick(value);
                    }}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {categories.map((category, index) => (
                        <SelectItem key={index} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <AllBlogCard
        blogPosts={blogPosts}
        loading={loading}
        error={error}
        loadMorePost={loadMorePost}
      />
    </>
  );
}

export function BlogCard(props) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/,/, "");
  };

  const handleCardClick = () => {
    navigate(`/posts/${props.id}`);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mt-14">
        <div
          onClick={handleCardClick}
          className="relative h-[212px] sm:h-[360px] cursor-pointer"
        >
          <img
            className="w-full h-full object-cover rounded-md"
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
              {props.category}
            </span>
          </div>
          <h2
            onClick={handleCardClick}
            className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline cursor-pointer"
          >
            {props.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
            {props.description}
          </p>
          <div className="flex items-center text-sm">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt={props.author}
            />
            <span>{props.author}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span>{formatDate(props.date)}</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export const AllBlogCard = ({ blogPosts, loading, error, loadMorePost }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center">
          <LoadingSpinner />
          <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!blogPosts || (Array.isArray(blogPosts) && blogPosts.length === 0)) {
    return <div>No details available for this category</div>;
  }

  return (
    <div className="flex flex-wrap justify-between ">
      {blogPosts.map((blog) => (
        <div key={blog.id} className="w-full sm:w-1/3 p-2 hover:scale-105">
          <BlogCard
            id={blog.id}
            image={blog.image}
            title={blog.title}
            description={blog.description}
            category={blog.category}
            author={blog.author}
            date={blog.date}
          />
        </div>
      ))}
      <div className="w-full flex justify-center items-center">
        <button
          onClick={(event) => loadMorePost(event)}
          className="p-5 bg-Brown-300 rounded-lg my-10 hover:bg-Brown-400"
        >
          Load More Posts
        </button>
      </div>
    </div>
  );
};

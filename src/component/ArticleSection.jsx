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
import api from "@/config/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner, MagnifyingIcon } from "@/component/icon";
import debounce from "lodash.debounce";

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

  const fetchPosts = async (category = "", page = 1, limit = 10) => {
    setLoading(true);
    setError("");

    const params = {
      ...(category && category.trim() && { category }),
      ...(keywordQuery && keywordQuery.trim() && { keyword: keywordQuery }),
      page,
      limit,
    };

    try {
      const response = await api.get(`/api/posts`, { params });
      setBlogPosts(response.data.data || []);
    } catch (err) {
      console.error("Error fetching posts:", err.response || err.message);
      setError(err.response?.data?.error || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  const searchPosts = async (query) => {
    if (query) {
      try {
        const response = await api.get(`/api/posts?keyword=${query}`);
        setSearchResults(response.data.posts || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  const debouncedSearch = debounce((query) => {
    searchPosts(query);
  }, 500);

  const debouncedKeywordQuery = debounce((query) => {
    setKeywordQuery(query);
  }, 500);

  useEffect(() => {
    fetchPosts(activeIndex, 1, limitPage);
  }, [keywordQuery, activeIndex, limitPage]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedKeywordQuery(value);
    debouncedSearch(value);
  };

  const handleCategoryClick = (category) => {
    setActiveIndex(category);
    setLimitPage(6);
    fetchPosts(category, 1, 6);
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 className="flex text-xl ml-6 font-semibold py-5">Latest articles</h1>

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
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <MagnifyingIcon />
            </span>
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

      <div className="flex justify-center pt-5 sm:hidden">
        <Card className="w-full bg-Brown-200">
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 mt-9">
                  <div className="relative">
                    <Input
                      onChange={handleSearchChange}
                      className="pr-10"
                      type="text"
                      placeholder="Search"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <MagnifyingIcon />
                    </span>
                    {searchResults.length > 0 && keywordQuery && (
                      <div className="absolute z-10 top-full bg-white w-full border border-gray-300">
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
      <div className="flex flex-col gap-4 mt-4">
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
              className="w-8 h-8 rounded-full mr-2 object-cover"
              src="https://img5.pic.in.th/file/secure-sv1/oleang-img1.jpg"
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
        <div className="loader border-t-4 border-Brown-600 w-12 h-12 rounded-full animate-spin"></div>
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
        <div key={blog.id} className="w-full sm:w-1/3 p-6 hover:scale-105">
          <BlogCard
            id={blog.id}
            image={blog.image}
            title={blog.title}
            description={blog.description}
            category={blog.category_name}
            author="OLEANG"
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

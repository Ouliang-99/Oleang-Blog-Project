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
import { blogPosts } from "../data/blogPosts.js";
import { useState } from "react";

export function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <h1 className="flex text-xl font-semibold py-5">Latest articles</h1>
      <div className="bg-Brown-200 p-6 hidden sm:block">
        <Menubar className="flex justify-between items-center">
          <div className="flex space-x-4">
            {categories.map((category, index) => (
              <MenubarMenu key={index}>
                <MenubarTrigger
                  onClick={() => setActiveIndex(index)}
                  className={`${
                    activeIndex === index
                      ? "bg-Brown-500 text-white" 
                      : "bg-transparent hover:bg-Brown-300"
                  } transition-colors duration-200 active:bg-Brown-500`}
                  style={{
                    pointerEvents: activeIndex === index ? "none" : "auto",
                  }}
                >
                  {category}
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </div>
          <div className="flex flex-col">
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
                  <Select>
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
    </>
  );
}

function BlogCard(props) {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-14">
        <a href="#" className="relative h-[212px] sm:h-[360px]">
          <img
            className="w-full h-full object-cover rounded-md"
            src={props.image}
            alt={props.title}
          />
        </a>
        <div className="flex flex-col">
          <div className="flex">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
              {props.category}
            </span>
          </div>
          <a href="#">
            <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
              {props.title}
            </h2>
          </a>
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
            <span>{props.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AllBlogCard() {
  return (
    <div className="flex flex-wrap justify-between ">
      {blogPosts.map((post, index) => (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-6" key={index}>
          <BlogCard
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        </div>
      ))}
    </div>
  );
}

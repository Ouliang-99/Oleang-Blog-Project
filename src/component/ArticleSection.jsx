import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Input } from "@/components/ui/input"
import * as React from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { blogPosts } from "../data/blogPosts.js";

export function ArticleSection() {
  return (
    <>
      <h1 className="flex text-xl font-semibold py-5">Latest articles</h1>
      <div className="bg-Brown-200 p-6 hidden sm:block">
        <Menubar className="flex justify-between items-center">
          <div className="flex space-x-4">
            <MenubarMenu>
              <MenubarTrigger>Highlight</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Cat</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Find</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Search the web</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Inspiration</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem>
                  Always Show Bookmarks Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked>
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled inset>
                  Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Hide Sidebar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>General</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </div>
          <Input
            className="md:w-72 ml-10 w-40 "
            type="text"
            placeholder="Search"
          />
        </Menubar>
      </div>
      <div className="bg-Brown-200 flex justify-center pt-5 sm:hidden">
        <Card className="w-[400px]">
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 mt-9">
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5 text-left">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
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
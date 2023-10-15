import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import React, { useState, useEffect } from "react";
import SelectOptions from "./SelectOptions";
import GenericTextInput from "./GenericTextInput";
import PostCard from "./PostCard";

function Discover() {
  const pricingOptionArr = ["All", "Premium", "Free"];
  const categoryOptionArr = [
    "All",
    "Unwind",
    "Lawyers Spotlight",
    "Curated News",
  ];
  const [category, setCategory] = useState<string>("All");
  const [pricing, setPricing] = useState<string>("All");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [searchValue, setSearchValue] = useState<string>("");

  const [posts, setPosts] = useState<IArticle[]>([]);

  async function getPosts() {
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts?q=${searchValue}&${
          category === "All" ? "" : `category=${category}`
        }&${
          pricing === "All" ? "" : `pricing=${pricing}`
        }&_sort=createdAt&_order=${order}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const wait = setTimeout(() => {
      getPosts();
    }, 500);

    return () => clearTimeout(wait);
  }, [searchValue]);

  useEffect(() => {
    getPosts();
  }, [category, pricing]);

  return (
    <div>
      <SelectOptions
        label="Pricing"
        optionArr={pricingOptionArr}
        inputValue={pricing}
        setInputValue={setPricing}
      />
      <SelectOptions
        label="Category"
        optionArr={categoryOptionArr}
        inputValue={category}
        setInputValue={setCategory}
      />
      <GenericTextInput
        label="Search by title"
        type="text"
        inputValue={searchValue}
        setInputValue={setSearchValue}
        placeHolder="Search by title"
      />
      <div className="mt-1 w-full grid grid-cols-1 divide-y-2 divide-solid sm:grid-cols-2 sm:divide-y-0 sm:gap-2 lg:grid-cols-3">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="mt-3 h-full">
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Discover;

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
  const orderArr = ["Oldest", "Latest"];
  const [category, setCategory] = useState<string>("All");
  const [pricing, setPricing] = useState<string>("All");
  const [order, setOrder] = useState<string>("Latest");
  const [searchValue, setSearchValue] = useState<string>("");

  const [posts, setPosts] = useState<IArticle[]>([]);

  async function getPosts() {
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts?${`q=${searchValue}`}${
          category === "All" ? "" : `&category=${category}`
        }${
          pricing === "All" ? "" : `&pricing=${pricing}`
        }&_sort=createdAt&_order=${order === "Latest" ? "desc" : "asc"}`
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
    }, 1000);

    return () => clearTimeout(wait);
  }, [searchValue]);

  useEffect(() => {
    getPosts();
  }, [category, pricing, order]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
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
          <SelectOptions
            label="Order"
            optionArr={orderArr}
            inputValue={order}
            setInputValue={setOrder}
          />
        </div>
        <GenericTextInput
          label="Search"
          type="text"
          inputValue={searchValue}
          setInputValue={setSearchValue}
          placeHolder="Search..."
        />
      </div>
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

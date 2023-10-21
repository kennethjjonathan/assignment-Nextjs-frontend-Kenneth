import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import React, { useState, useEffect } from "react";
import SelectOptions from "./SelectOptions";
import GenericTextInput from "./GenericTextInput";
import PostCard from "./PostCard";
import ModalBase from "./ModalBase";
import BlackButton from "./BlackButton";
import { BsFilterLeft } from "react-icons/bs";
import PostCardSkeleton from "./skeletons/PostCardSkeleton";
import NotAbleToGetContent from "./NotAbleToGetContent";

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getPosts() {
    setIsLoading(true);
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
    setIsLoading(false);
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
    <>
      <ModalBase isOpen={isFilterModalOpen}>
        <div className="w-4/5 py-3 bg-smokewhite-custom rounded-xl">
          <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
            <p>Filter Settings</p>
            <button
              className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
              onClick={() => setIsFilterModalOpen(false)}
            >
              X
            </button>
          </div>
          <div className="w-full px-5 py-3 h-auto flex flex-col gap-5">
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
        </div>
      </ModalBase>
      <div className="w-full">
        <div className="flex items-end justify-between w-full flex-col gap-5 lg:flex-row">
          <div className="lg:flex items-center gap-3 hidden">
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
          <div className="w-full lg:w-fit flex items-center">
            <GenericTextInput
              type="text"
              inputValue={searchValue}
              setInputValue={setSearchValue}
              placeHolder="Search..."
            />
          </div>
          <BlackButton
            additionalStyling="text-lg lg:hidden"
            innerAdditionalStyling="px-2 py-1"
            callback={() => setIsFilterModalOpen(true)}
          >
            <BsFilterLeft />
            Filter
          </BlackButton>
        </div>
        <div className="mt-1 w-full grid grid-cols-1 divide-y-2 divide-solid sm:grid-cols-2 sm:divide-y-0 sm:gap-2 lg:grid-cols-3">
          {isLoading ? (
            <>
              <div className="mt-3 h-full">
                <PostCardSkeleton />
              </div>
              <div className="mt-3 h-full">
                <PostCardSkeleton />
              </div>
              <div className="mt-3 h-full">
                <PostCardSkeleton />
              </div>
            </>
          ) : (
            posts.length > 0 &&
            posts.map((post) => (
              <div key={post.id} className="mt-3 h-full">
                <PostCard post={post} />
              </div>
            ))
          )}
        </div>
        {posts.length === 0 && <NotAbleToGetContent text="No Result" />}
      </div>
    </>
  );
}

export default Discover;

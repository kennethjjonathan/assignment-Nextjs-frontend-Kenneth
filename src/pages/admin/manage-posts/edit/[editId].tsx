import IArticle from "@/interface/IArticle";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Head from "next/head";
import GenericTextInput from "@/components/GenericTextInput";
import SelectOptions from "@/components/SelectOptions";
import PrimaryButton from "@/components/PrimaryButton";
import TextAreaInput from "@/components/TextAreaInput";
import uploadImage from "@/library/helper/uploadImage";
import CONSTANTS from "@/constants/constants";

function Index() {
  const router = useRouter();
  const data: IArticle = JSON.parse(router.query.data?.toString()!);

  const optionArr: string[] = ["Unwind", "Lawyers Spotlight", "Curated News"];
  const [titleValue, setTitleValue] = useState<string>(data.title);
  const [openingValue, setOpeningValue] = useState<string>(data.opening!);
  const [category, setCategory] = useState<string>(data.category);
  const [author, setAurhor] = useState<string>(data.author);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [pricingOption, setPricingOption] = useState<"free" | "premium">(
    data.isPremium ? "premium" : "free"
  );
  const [content, setContent] = useState<string>(data.content.join("/n"));

  return (
    <>
      <Head>
        <title>Admin - Create A Post</title>
      </Head>
      <div className="container mx-auto px-3 pt-5 pb-16">
        <h1 className="text-5xl font-[800]">Create a Post</h1>
        <div className="mt-8 w-full">
          <div>
            <GenericTextInput
              label="Post Title"
              type="text"
              inputValue={titleValue}
              setInputValue={setTitleValue}
              placeHolder="Ex: What Can We Learn From Introverted Lawyers"
            />
          </div>
          <div className="mt-3">
            <GenericTextInput
              label="Post Opening Line"
              type="text"
              inputValue={openingValue}
              setInputValue={setOpeningValue}
              placeHolder="Ex: Who knew that the best lawyers in town is actually introverts..."
            />
          </div>
          <div className="mt-3">
            <SelectOptions
              label="Post Category"
              optionArr={optionArr}
              inputValue={category}
              setInputValue={setCategory}
            />
          </div>
          <div className="mt-3">
            <GenericTextInput
              label="Post Author"
              type="text"
              inputValue={author}
              setInputValue={setAurhor}
              placeHolder="Please put in Author's name"
            />
          </div>
          <div className="mt-3 h-auto grid place-items-center">
            {thumbnailFile === undefined ? (
              <>
                <p className="text-base font-[700]">
                  Please upload the thumbnail picture:
                </p>
                <label
                  htmlFor="post-thumbnail"
                  className="bg-blue-500 text-primary border-2 rounded-md border-blue-500 hover:bg-transparent hover:text-blue-500 active:bg-blue-800 duration-300 focus:outline-none cursor-pointer px-5 py-5 mt-3"
                >
                  Upload Thumbnail
                  <input
                    type="file"
                    id="post-thumbnail"
                    className="hidden"
                    onChange={(e) => {
                      handleThumbnailInput(e);
                      e.target.value = "";
                    }}
                  />
                </label>
              </>
            ) : (
              <>
                <p className="text-lg font-[700]">Thumbnail:</p>
                <img
                  className="w-72 h-48 rounded-md shadow-2xl mt-3 sm:w-auto sm:h-60 md:h-96"
                  src={URL.createObjectURL(thumbnailFile)}
                  alt="chosen thumbnail"
                />
                <p className="text-base font-[500] mt-3">
                  {thumbnailFile.name !== undefined
                    ? thumbnailFile.name
                    : "Can't load file name"}
                </p>
                <PrimaryButton
                  callback={handleChangeThumbnal}
                  additionalStyling="px-3 py-2 mt-2 text-lg"
                >
                  Change Thumbnail
                </PrimaryButton>
              </>
            )}
          </div>
          <div className="mt-3">
            <TextAreaInput
              label="Content"
              inputValue={content}
              setInputValue={setContent}
            />
            <p className="text-base font-[500] mt-3">
              Please type in "/n" to seperate paragraphs.
            </p>
          </div>
          <div className="mt-3">
            <p className="text-xl font-[800]">
              Please choose the pricing option:
            </p>
            <div className="flex items-center gap-8">
              <label
                htmlFor="premium-post"
                className="cursor-pointer text-lg font-[600]"
              >
                <input
                  type="radio"
                  id="premium-post"
                  value="premium"
                  name="pricing-option"
                  className="cursor-pointer"
                  onChange={(e) =>
                    setPricingOption(e.target.value as "premium")
                  }
                  checked
                />
                Premium Post
              </label>
              <label
                htmlFor="free-post"
                className="cursor-pointer text-lg font-[600]"
              >
                <input
                  type="radio"
                  id="free-post"
                  value="free"
                  name="pricing-option"
                  onChange={(e) => setPricingOption(e.target.value as "free")}
                  className="cursor-pointer"
                />
                Free Post
              </label>
            </div>
          </div>
          <div className="mt-5 grid place-items-center">
            <PrimaryButton
              callback={handleCreatePost}
              additionalStyling="py-2 px-2 text-xl w-full"
            >
              Create Post
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;

import React, { useState } from "react";
import Head from "next/head";
import GenericTextInput from "@/components/GenericTextInput";
import SelectOptions from "@/components/SelectOptions";
import PrimaryButton from "@/components/PrimaryButton";
import TextAreaInput from "@/components/TextAreaInput";
import uploadImage from "@/library/helper/uploadImage";
import CONSTANTS from "@/constants/constants";
import { useRouter } from "next/router";

function Index() {
  const optionArr: string[] = ["Unwind", "Lawyers Spotlight", "Curated News"];
  const [titleValue, setTitleValue] = useState<string>("");
  const [openingValue, setOpeningValue] = useState<string>("");
  const [category, setCategory] = useState<string>(optionArr[0]);
  const [author, setAurhor] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [pricingOption, setPricingOption] = useState<"free" | "premium">(
    "premium"
  );
  const [content, setContent] = useState<string>("");

  const router = useRouter();

  function handleThumbnailInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setThumbnailFile(e.target.files[0]);
  }

  function handleChangeThumbnail() {
    setThumbnailFile(undefined);
  }

  async function handleCreatePost() {
    console.log("mulai");
    try {
      const thumbnailURL: string = await uploadImage(thumbnailFile);
      console.log("Ini image url", thumbnailURL);
      const response = await fetch(`${CONSTANTS.BASELOCALHOST}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liked: 0,
          shared: 0,
          isPremium: pricingOption === "premium" ? true : false,
          category: category,
          title: titleValue,
          opening: openingValue,
          author: author,
          thumbnail: thumbnailURL,
          content: content.split("/n"),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      router.replace("/admin/manage-posts");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Head>
        <title>Create A Post</title>
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
                  callback={handleChangeThumbnail}
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

import IArticle from "@/interface/IArticle";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import GenericTextInput from "@/components/GenericTextInput";
import SelectOptions from "@/components/SelectOptions";
import PrimaryButton from "@/components/PrimaryButton";
import TextAreaInput from "@/components/TextAreaInput";
import uploadImage from "@/library/helper/uploadImage";
import CONSTANTS from "@/constants/constants";
import urlToFileConverter from "@/library/helper/urltoFileConverter";
import generateRandomString from "@/library/helper/generateRandomString";
import Image from "next/image";
import { GetServerSideProps } from "next";

type EditPost = {
  data: IArticle;
};

const EditPost = ({ data }: EditPost) => {
  const router = useRouter();
  const optionArr: string[] = ["Unwind", "Lawyers Spotlight", "Curated News"];
  const [titleValue, setTitleValue] = useState<string>(data.title);
  const [openingValue, setOpeningValue] = useState<string>(data.opening!);
  const [category, setCategory] = useState<string>(data.category);
  const [author, setAuthor] = useState<string>(data.author);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [pricingOption, setPricingOption] = useState<"Free" | "Premium">(
    data.pricing ? "Premium" : "Free"
  );
  const [content, setContent] = useState<string>(data.content.join("\n"));

  const setInitialThumbnail = async () => {
    try {
      const thumbnailFile = await urlToFileConverter(
        data.thumbnail,
        data.title
      );
      setThumbnailFile(thumbnailFile);
    } catch (error) {
      console.error(error);
    }
  };

  const handleThumbnailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setThumbnailFile(e.target.files[0]);
  };

  const handleChangeThumbnail = () => {
    setThumbnailFile(undefined);
  };

  const handleCreatePost = async () => {
    try {
      const thumbnailURL: string = await uploadImage(thumbnailFile);
      console.log("Ini image url", thumbnailURL);
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            liked: data.liked,
            shared: data.shared,
            pricing: pricingOption,
            category: category,
            title: titleValue,
            opening: openingValue,
            author: author,
            thumbnail: thumbnailURL,
            content: content.split("\n"),
            identifier:
              titleValue.split(" ").join("-") + "-" + generateRandomString(),
            createdAt: data.createdAt,
            updatedAt: new Date(),
          }),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      router.replace("/admin/manage-posts");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInitialThumbnail();
  }, []);

  return (
    <>
      <Head>
        <title>Edit A Post</title>
      </Head>
      <div className="container mx-auto px-3 pt-5 pb-16">
        <h1 className="text-5xl font-[800]">Edit Post (id: {data.id})</h1>
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
              setInputValue={setAuthor}
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
                <div className="w-72 h-64 rounded-md shadow-2xl mt-3 sm:w-96 sm:h-80 md:h-96 overflow-hidden relative">
                  <Image
                    src={URL.createObjectURL(thumbnailFile)}
                    alt="chosen thumbnail"
                    fill={true}
                  />
                </div>

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
          </div>
          <div className="mt-3">
            <p className="text-xl font-[800]">
              Please choose the pricing option:
            </p>
            <div className="flex items-center gap-8">
              <label
                htmlFor="Premium-post"
                className="cursor-pointer text-lg font-[600]"
              >
                <input
                  type="radio"
                  id="Premium-post"
                  value="Premium"
                  name="pricing-option"
                  className="cursor-pointer"
                  onChange={(e) =>
                    setPricingOption(e.target.value as "Premium")
                  }
                  checked
                />
                Premium Post
              </label>
              <label
                htmlFor="Free-post"
                className="cursor-pointer text-lg font-[600]"
              >
                <input
                  type="radio"
                  id="Free-post"
                  value="Free"
                  name="pricing-option"
                  onChange={(e) => setPricingOption(e.target.value as "Free")}
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
              Save Edit
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await fetch(
    `${CONSTANTS.BASELOCALHOST}/posts/${params?.editId}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
    },
  };
};

export default EditPost;

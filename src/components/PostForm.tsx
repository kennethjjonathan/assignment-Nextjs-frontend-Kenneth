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
import errorNotify from "@/library/helper/errorNotify";
import NotAbleToGetContent from "@/components/NotAbleToGetContent";
import successNotify from "@/library/helper/successToast";

type PostFormProps = {
  data: IArticle | null;
  isEdit?: boolean;
};

function PostForm({ data, isEdit = false }: PostFormProps) {
  const router = useRouter();
  const optionArr: string[] = ["Unwind", "Lawyers Spotlight", "Curated News"];
  const pricingArr: string[] = ["Free", "Premium"];
  const [titleValue, setTitleValue] = useState<string>(
    isEdit ? data!.title : ""
  );
  const [openingValue, setOpeningValue] = useState<string>(
    isEdit ? data!.opening! : ""
  );
  const [category, setCategory] = useState<string>(
    isEdit ? data!.category : optionArr[0]
  );
  const [author, setAuthor] = useState<string>(isEdit ? data!.author : "");
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [pricingOption, setPricingOption] = useState<string>(
    isEdit ? data!.pricing : pricingArr[0]
  );
  const [content, setContent] = useState<string>(
    isEdit ? data!.content.join("\n\n") : ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setInitialThumbnail();
  }, []);

  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isOpeningValid, setIsOpeningValid] = useState<boolean>(true);
  const [isAuthorValid, setIsAuthorValid] = useState<boolean>(true);
  const [isThumbnailValid, setIsThumbnailValid] = useState<boolean>(true);
  const [isContentValid, setIsContentValid] = useState<boolean>(true);

  if (data === null && isEdit) {
    return (
      <>
        <Head>
          <title>Edit A Post</title>
        </Head>
        <div className="container mx-auto px-generic-horizontal-mobile pt-generic-top-mobile pb-generic-bottom-mobile">
          <PrimaryButton
            additionalStyling="text-xl px-2 py-1"
            callback={() => router.push("/admin/manage-posts")}
          >
            Go Back
          </PrimaryButton>
          <NotAbleToGetContent text="Not able to get the article" />
        </div>
      </>
    );
  }

  const setInitialThumbnail = async () => {
    if (!isEdit || data === null) {
      return;
    }
    try {
      const thumbnailFile = await urlToFileConverter(
        data!.thumbnail,
        data!.title
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
    if (!validateAll()) return;
    setIsLoading(true);
    if (isEdit) {
      try {
        const thumbnailURL: string = await uploadImage(thumbnailFile);
        const response = await fetch(
          `${CONSTANTS.BASELOCALHOST}/posts/${data!.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              liked: data!.liked,
              shared: data!.shared,
              pricing: pricingOption,
              category: category,
              title: titleValue,
              opening: openingValue,
              author: author,
              thumbnail: thumbnailURL,
              content: content.split(/\n+/g),
              identifier:
                titleValue
                  .replace(/[^\w]|_/gi, "-")
                  .split(" ")
                  .join("-") +
                "-" +
                generateRandomString(),
              createdAt: data!.createdAt,
              updatedAt: new Date(),
            }),
          }
        );
        if (!response.ok) {
          errorNotify(response);
          throw new Error(response.statusText);
        }
        successNotify("Edit is successful");
        router.replace("/admin/manage-posts");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const thumbnailURL: string = await uploadImage(thumbnailFile);
        const response = await fetch(`${CONSTANTS.BASELOCALHOST}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            liked: 0,
            shared: 0,
            pricing: pricingOption,
            category: category,
            title: titleValue,
            opening: openingValue,
            author: author,
            thumbnail: thumbnailURL,
            content: content.split(/\n+/g),
            identifier:
              titleValue
                .replace(/[^\w]|_/gi, "-")
                .split(" ")
                .join("-") +
              "-" +
              generateRandomString(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        });
        if (!response.ok) {
          errorNotify(response);
          throw new Error(response.statusText);
        }
        router.replace("/admin/manage-posts");
        successNotify(`Successfully created ${titleValue}`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  function validateTitle(): boolean {
    if (titleValue.length === 0) {
      setIsTitleValid(false);
      return false;
    }
    setIsTitleValid(true);
    return true;
  }

  function validateOpening(): boolean {
    if (openingValue.length === 0) {
      setIsOpeningValid(false);
      return false;
    }
    setIsOpeningValid(true);
    return true;
  }

  function validateAuthor(): boolean {
    if (author.length === 0) {
      setIsAuthorValid(false);
      return false;
    }
    setIsAuthorValid(true);
    return true;
  }

  function validateThumbnail(): boolean {
    if (thumbnailFile === undefined) {
      setIsThumbnailValid(false);
      return false;
    }
    setIsThumbnailValid(true);
    return true;
  }

  function validateContent(): boolean {
    if (content.length === 0) {
      setIsContentValid(false);
      return false;
    }
    setIsContentValid(true);
    return true;
  }

  function validateAll(): boolean {
    let isContinue: boolean = true;
    if (!validateTitle()) isContinue = false;
    if (!validateOpening()) isContinue = false;
    if (!validateAuthor()) isContinue = false;
    if (!validateThumbnail()) isContinue = false;
    if (!validateContent()) isContinue = false;
    return isContinue;
  }

  return (
    <>
      <Head>
        <title>{isEdit ? "Edit A Post" : "Create A Post"}</title>
      </Head>
      <div className="container mx-auto px-generic-horizontal-mobile pt-generic-top-mobile pb-generic-bottom-mobile">
        <PrimaryButton
          additionalStyling="text-xl px-2 py-1"
          callback={() => router.push("/admin/manage-posts")}
        >
          Go Back
        </PrimaryButton>
        <h1 className="text-5xl font-[800] mt-5">
          {isEdit ? `Edit Post (id: ${data!.id})` : "Create a post"}
        </h1>
        <div className="mt-5 w-full">
          <div>
            <GenericTextInput
              label="Post Title"
              type="text"
              inputValue={titleValue}
              setInputValue={setTitleValue}
              isValid={isTitleValid}
              blurFunc={validateTitle}
              errorMessage="Title can't be empty"
              placeHolder="Ex: What Can We Learn From Introverted Lawyers"
            />
          </div>
          <div className="mt-3">
            <GenericTextInput
              label="Post Opening Line"
              type="text"
              inputValue={openingValue}
              setInputValue={setOpeningValue}
              isValid={isOpeningValid}
              blurFunc={validateOpening}
              placeHolder="Ex: Who knew that the best lawyers in town is actually introverts..."
              errorMessage="Opening can't be empty"
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
              isValid={isAuthorValid}
              blurFunc={validateAuthor}
              placeHolder="Please put in Author's name"
              errorMessage="Author can't be empty"
            />
          </div>
          <div className="mt-3 h-auto grid place-items-center">
            {!isThumbnailValid && (
              <p className="text-base font[700] text-red-custom">
                Thumbnail can&apos;t be empty
              </p>
            )}
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
                <div className="w-1/2 h-64 rounded-md shadow-2xl mt-3 sm:h-80 md:h-96 overflow-hidden relative">
                  <Image
                    src={URL.createObjectURL(thumbnailFile)}
                    alt="chosen thumbnail"
                    fill={true}
                    style={{ objectFit: "cover" }}
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
              inputValid={isContentValid}
              errorMessage="Content can't be empty"
              blurFunc={validateContent}
            />
          </div>
          <div className="mt-3">
            <SelectOptions
              label="Pricing Option"
              optionArr={pricingArr}
              inputValue={pricingOption}
              setInputValue={setPricingOption}
            />
          </div>
          <div className="mt-5 grid place-items-center">
            <PrimaryButton
              callback={handleCreatePost}
              isLoading={isLoading}
              additionalStyling="py-2 px-2 text-xl w-full"
            >
              {isEdit ? "Save Edit" : "Create Post"}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostForm;

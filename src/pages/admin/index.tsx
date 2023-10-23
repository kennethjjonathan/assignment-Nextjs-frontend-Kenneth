import CONSTANTS from "@/constants/constants";
import { GetServerSideProps } from "next";
import IUser from "@/interface/IUser";
import * as cookie from "cookie";
import errorNotify from "@/library/helper/errorNotify";
import Profile from "@/components/Profile";

type AdminProfileProps = {
  user: IUser | null;
};

function Index({ user }: AdminProfileProps) {
  return <Profile user={user} transaction={null} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let user: IUser | null = null;
  const cookieData = cookie.parse(req.headers.cookie!);

  if (cookieData.USER) {
    user = JSON.parse(cookieData.USER);
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/users/${user!.id}`
      );
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      user = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      user: user || null,
    },
  };
};

export default Index;

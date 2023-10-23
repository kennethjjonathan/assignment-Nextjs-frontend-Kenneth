import IArticle from "@/interface/IArticle";
import IHistory from "@/interface/IHistory";
import IUser from "@/interface/IUser";

function historyUpdater(user: IUser, post: IArticle): IUser {
  const helperDate = new Date();
  const newHistory: IHistory = {
    id: post.id,
    title: post.title,
    identifier: post.identifier,
    readTime: new Date(
      helperDate.getTime() - helperDate.getTimezoneOffset() * 60000
    ).toISOString(),
  };
  if (user.history === undefined) {
    return { ...user, history: [newHistory] };
  }

  const newHistoryArr: IHistory[] = user.history.slice();

  for (let i = 0; i < newHistoryArr.length; i++) {
    if (newHistoryArr[i].id === newHistory.id) {
      newHistoryArr.splice(i, 1);
      break;
    }
  }
  newHistoryArr.unshift(newHistory);
  const newUser = { ...user, history: newHistoryArr };
  return newUser;
}

export default historyUpdater;

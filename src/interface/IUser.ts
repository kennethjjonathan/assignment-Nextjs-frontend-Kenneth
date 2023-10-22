import IHistory from "./IHistory";

export default interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  address: string;
  phoneNumber: string;
  subscription: {
    isSubscribed: boolean;
    expiration: Date;
  };
  liked: number[];
  history: IHistory[];
  favorite: {
    Unwind: number;
    "Lawyers Spotlight": number;
    "Curated News": number;
  };
  shared: number[];
  createdAt: Date;
  updatedAt: Date;
}

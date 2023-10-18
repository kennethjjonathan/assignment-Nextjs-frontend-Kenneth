import IHistory from "./IHistory";

export default interface IUser {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  address?: string;
  phoneNumber?: string;
  subscription?: {
    isSubscribed: boolean;
    expiration: Date;
  };
  liked: number[];
  history: IHistory[];
  createdAt: Date;
  updatedAt: Date;
}

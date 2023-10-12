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
  createdAt: Date;
  updatedAt: Date;
}

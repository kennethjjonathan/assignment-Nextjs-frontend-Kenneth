export default interface ICookieUser {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  subscription?: {
    isSubscribed: boolean;
    expiration: Date;
  };
}

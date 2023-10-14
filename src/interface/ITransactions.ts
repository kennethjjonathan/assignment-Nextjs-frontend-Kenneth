import IUser from "./IUser";

export default interface ITransaction {
  id: number;
  user: IUser;
  status: "process" | "completed" | "canceled";
  paymentCompletion: boolean;
  price: 50000 | 600000;
  package: "perMonth" | "perYear";
  createdAt: Date;
  updatedAt: Date;
}

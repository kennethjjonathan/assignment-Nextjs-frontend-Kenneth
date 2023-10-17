import IUser from "./IUser";

export default interface ITransaction {
  id: number;
  userId: number;
  status: "process" | "completed" | "canceled";
  paymentCompletion: boolean;
  price: 50000 | 600000;
  package: "Monthly" | "Yearly";
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

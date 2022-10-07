import { Schema, model } from "mongoose";

export interface IUser {
  firstname: string;
  lastname: string;
  billingaddress: string;
  physicaladdress:string
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  billingaddress: { type: String, required: true },
  physicaladdress:{ type: String, required: true },
});

export const User = model<IUser>("User", userSchema);

export const isUser = async (user: any) => {
  return ['firstname', 'lastname', 'billingaddress','physicaladdress'].every((key: string) => user.hasOwnProperty(key))
};

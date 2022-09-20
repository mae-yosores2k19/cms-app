import { Schema, model } from "mongoose";

export interface IUser {
  firstname: string;
  lastname: string;
  address: string;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
});

export const User = model<IUser>("User", userSchema);

export const isUser = async (user: any) => {
  return ['firstname', 'lastname', 'address'].every((key: string) => user.hasOwnProperty(key))
};

//import mongoose, { Mongoose, ObjectId } from "mongoose";

export interface UserInterface {
  surname: string;
  firstname: string;
  email: string;
  password: string;
  token?:string;
  tokenRef?:string;
}

type defaultResponseInterface = {
  success: boolean;
  data: UserInterface | [UserInterface] | unknown;
  message: string;
};

export type registerType = (body: {
  surname: string;
  firstname: string;
  email: string;
  confirmPassword: string;
  password: string;
}) => Promise<defaultResponseInterface>;

export type loginType = (body: {
  email: string;
  password: string;
}) => Promise<defaultResponseInterface>;

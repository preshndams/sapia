import { compare, hash, hashSync } from "bcryptjs";

import { Schema, model } from "mongoose";

import { UserInterface } from "./interface";

const UserSchema = new Schema<UserInterface>(
  {
    surname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export async function comparePassword(plainText: any, hash: any) {
  try {
    return await compare(plainText, hash);
  } catch (err) {
    throw err;
  }
}

UserSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

// UserSchema.index({
//   email: 1,
// });

export const User = model("User", UserSchema);

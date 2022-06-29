import { connect } from "mongoose";

export default async (): Promise<void> => {
  try {
    await connect(`${process.env.MONGO_URI}`, {
      autoCreate: true,
    });

    console.log("Mongo Db Connected");
  } catch (err) {
    console.log(err);
  }
};

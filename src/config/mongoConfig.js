import mongoose from "mongoose";

export const connectMongoDB = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_URI);
    connection && console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "next-connect";

const initDatabase = () =>
  mongoose
    .connect(process.env.MONGODB_URL!, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.info("Connected to DB! 😊");
    });

const withDatabase: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res, next) => {
  if (!mongoose.connection.readyState) await initDatabase();

  return next();
};

export default withDatabase;

import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

mongoose
  .connect(MONGODB_URI, {})
  .then((db) => console.log("Database connected"))
  .catch((err) => console.log(err));

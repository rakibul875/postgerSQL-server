import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import routes from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/", routes);
const startServer =async () => {
  app.listen(process.env.PORT || 5000);
};
startServer();

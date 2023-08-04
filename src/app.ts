import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./routes";
import { database } from "./models";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database()
  .then(() => {
    app.use(router);
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
      console.log("Data Source has been initialized!");
    });
  })
  .catch((error: Error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });

 
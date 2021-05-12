import express, { urlencoded } from "express";
import dotenv from "dotenv"
import morgan from "morgan"
import mongoSanitize from "express-mongo-sanitize"
import cors from "cors"
import routes from "./src/routes";
import { sendFailureResponse } from "./src/utils/appResponse";

dotenv.config()

const app = express();

app.use(cors())
app.use(morgan("dev"))
app.use(mongoSanitize())
app.set("trust proxy", true);
app.use(express.json());
app.use(urlencoded({ extended: false })) 

app.use("/api/v1/", routes())

app.get("/api/v1", (_, res) => {
  res.status(200).json({
    message: `Welcome to v1 of customer support, visit the docs - ${"https://customer-support-2021.herokuapp.com/api/v1/docs"}`
  })
})

app.all("*", (_, res) => {
  sendFailureResponse(res, 404, "Route not found")
})
export default app;

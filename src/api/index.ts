import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import checkLCS from "./checkLCS"

type CheckResponseType = { 
  numberOverlapping: number,
  charactersOverlapping: string 
};

// load the environment variables from the .env file
dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT;
const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy");
});

app.post("/check", (req, res) => {
  const str1 = req.body.searchTerm
  const str2 = req.body.text
  const result = checkLCS(str1, str2)
  res.json(result as CheckResponseType);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

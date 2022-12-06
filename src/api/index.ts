import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

// Models
import { CheckResponseType } from "../shared/models/CheckResponseType";

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
  const searchTerm = req.body.searchTerm;
  const text = req.body.text;
  let dp: number[][] = [[]];
  let subSequence: string[] = [];

  for (let i = 0; i < searchTerm.length + 1; i++) {
    dp[i] = [];
    for (let j = 0; j < text.length + 1; j++) {
      dp[i][j] = 0;
    }
  }

  for (let j = text.length - 1; j > -1; j--) {
    for (let i = searchTerm.length - 1; i > -1; i--) {
      if (searchTerm[i] === text[j]) {
        // TODO: Find a way to add the overlapping sequence
        // console.log(searchTerm[i])
        // console.log(text[j])
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  const subString = subSequence.join("");
  res.json({
    numberOverlapping: dp[0][0],
    charactersOverlapping: subString,
  } as CheckResponseType);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
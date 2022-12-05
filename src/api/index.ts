import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

const PORT = process.env.PORT;
const app: Application = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Healthy')
})

app.post("/check", (req, res) => {
  console.log(req)
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
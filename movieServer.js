
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { router as movieRouter } from './routers/movieRouter.js'

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_CONNECTION);

const db = mongoose.connection;

db.on("error", (err) => {
    console.error(err);
});
db.once("open", () => {
    console.log("Connected to database");
});


const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

app.use("/movie", movieRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
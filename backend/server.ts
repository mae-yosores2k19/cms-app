// const express = require('express');
import express, { Express, Request, Response } from "express";
import userRoute from "./routes/contact-route";
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors")
const db = require("./database/init");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
// test 2
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

db.connect();

app.get("/*", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

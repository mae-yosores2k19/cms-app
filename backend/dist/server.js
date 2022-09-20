"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const contact_route_1 = __importDefault(require("./routes/contact-route"));
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./database/init");
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db.connect();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/user", contact_route_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

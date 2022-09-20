const mongoose = require("mongoose");

const url = `mongodb+srv://jessa:42MwB4GEFlCDU8H4@myapp.z0ntlh9.mongodb.net/UserContact`;
const opts = {
  retryWrites: true,
  w: "majority",
};
const connect = () => {
  mongoose
    .connect(url, opts)
    .then((connection: any) => {
      console.log("DB connected: ", url);
    })
    .catch((err: any) => {
      console.log("DB connection faild", err);
    });
};

module.exports = { connect };

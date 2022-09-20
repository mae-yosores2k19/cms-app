import axios from "axios";
import { IUser } from "../components/type";
const base = "http://localhost:4000/api/user";

async function addContact(body: IUser) {
  try {
    let { data } = await axios.post(`${base}/addContact`, body);
    return { status: "success", response: data };
  } catch (error) {
    console.log(
      "%c 🤧: addContact -> error ",
      "font-size:16px;background-color:#51c80b;color:white;",
      error
    );
  }
}
export default {
  addContact,
};

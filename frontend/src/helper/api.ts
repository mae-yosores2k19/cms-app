import axios from "axios";
import { IUser } from "../components/type";
const base =
  process.env.REACT_APP_API_URL ||
  // "https://contact-management-api.herokuapp.com/api/user";//for not containerize api
  "https://dockerize-cms-api.herokuapp.com/api/user" //for containerize api
  // "http://localhost:4000/api/user/"; //local api

const addContact = async (body: IUser) => {
  try {
    let { data } = await axios.post(`${base}/addContact`, body);  
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

const getAllContact = async () => {
  try {
    let { data } = await axios.get(`${base}/getAllContact`);
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};
const getContactById = async (id: string) => {
  try {
    let { data } = await axios.post(`${base}/getContactById`, { id });
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

const deleteContact = async (id: string) => {
  try {
    const { data } = await axios.post(`${base}/removeContactById`, { id });
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

const updateContact = async (body: IUser) => {
  try {
    const { data } = await axios.put(`${base}/updateContact/`, body);
    return data;
  } catch (error) {
    console.log(error, "Internal server error");
  }
};

export default {
  addContact,
  getAllContact,
  getContactById,
  deleteContact,
  updateContact,
};

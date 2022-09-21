import { Request, Response } from "express";
import { IUser, isUser } from "../models/contact-models";
const contactService = require("../services/contact-service");

exports.addContact = async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body;
    const valid = await isUser(user);
    if (valid) {
      const addUser = await contactService.insertContact(user);
      return res.json({ msg: "success", data: addUser });
    } else {
      return res.json({ msg: "error" });
    }
  } catch (error) {
    return res.json({ err: error });
  }
};

exports.getAllContact = async (req: Request, res: Response) => {
  try {
    const getAllData = await contactService.getAllContact();
    return res.json({ data: getAllData, msg: "Retrieve Successfully" });
  } catch (error) {
    return res.json({ err: error, msg: "Internal server error" });
  }
};

exports.removeContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (id) {
      const removeById = await contactService.removeContactById(id);
      return res.json({ msg: "Remove Successfully", data: removeById });
    } else {
      return res.json({ msg: "Bad Request" });
    }
  } catch (error) {
    return res.json({ data: error, msg: "Internal server error" });
  }
};

exports.updateContact = async (req: Request, res: Response) => {
  try {
    const param = req.body;
    const update = await contactService.updateContact(param);
    return res.json({ msg: "Updated Successfully", data: update });
  } catch (error) {
    return res.json({ data: error, msg: "Internal server error" });
  }
};

exports.getContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (id) {
      const getById = await contactService.getContactById(id);
      return res.json({ data: getById, msg: "Retrieve Successfully" });
    } else {
      return res.json({ msg: "Bad Request" });
    }
  } catch (error) {
    return res.json({ data: error, msg: "Internal server error" });
  }
};

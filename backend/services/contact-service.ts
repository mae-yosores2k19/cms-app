import { IUser, User } from "../models/contact-models";

exports.insertContact = async (user: IUser) => {
  //  do logic
  try {
    let addUser = await User.create(user);
    if (addUser === null) {
      return { msg: "Unprocessable request" };
    } else {
      return { msg: "Created Successfully", data: addUser };
    }
  } catch (error: any) {
    return { data: error, msg: "Internal server error" };
  }
};

exports.getAllContact = async () => {
  try {
    let allContacts = await User.find({});
    if (Object.keys(allContacts).length === 0) {
      return { msg: "No data available" };
    } else {
      return { msg: "Retrieve Success", data: allContacts };
    }
  } catch (error) {
    return { msg: "Internal server error", data: error };
  }
};

exports.removeContactById = async (id: IUser) => {
  try {
    let removeById = await User.findByIdAndRemove(id);
    if (removeById === null) {
      return { msg: "Not found" };
    } else {
      return { msg: "Success", data: removeById };
    }
  } catch (error) {
    return { msg: "Internal server error", data: error };
  }
};

exports.updateContact = async (data: any) => {
  try {
    let updateUser = await User.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    if (updateUser === null) {
      return { msg: "Not found" };
    } else {
      return { msg: "Success", data: updateUser };
    }
  } catch (error) {
    return { msg: "Internal server error" };
  }
};

exports.getContactById = async (id: any) => {
  try {
    let getById = await User.findById(id);
    if (getById === null) {
      return { msg: "Not found" };
    } else {
      return { msg: "Success", data: getById };
    }
  } catch (error) {
    return { msg: "Internal server error" };
  }
};

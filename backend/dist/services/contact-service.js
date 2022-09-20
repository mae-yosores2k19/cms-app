"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_models_1 = require("../models/contact-models");
exports.insertContact = (user) => __awaiter(void 0, void 0, void 0, function* () {
    //  do logic
    try {
        let addUser = yield contact_models_1.User.create(user);
        if (addUser === null) {
            return { msg: "Unprocessable request" };
        }
        else {
            return { msg: "Created Successfully", data: addUser };
        }
    }
    catch (error) {
        return { data: error, msg: "Internal server error" };
    }
});
exports.getAllContact = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allContacts = yield contact_models_1.User.find({});
        if (Object.keys(allContacts).length === 0) {
            return { msg: "No data available" };
        }
        else {
            return { msg: "Retrieve Success", data: allContacts };
        }
    }
    catch (error) {
        return { msg: "Internal server error", data: error };
    }
});
exports.removeContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let removeById = yield contact_models_1.User.findByIdAndRemove(id);
        if (removeById === null) {
            return { msg: "Not found" };
        }
        else {
            return { msg: "Success", data: removeById };
        }
    }
    catch (error) {
        return { msg: "Internal server error", data: error };
    }
});
exports.updateContact = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateUser = yield contact_models_1.User.findByIdAndUpdate(data.id, data, { new: true });
        if (updateUser === null) {
            return { msg: "Not found" };
        }
        else {
            return { msg: "Success", data: updateUser };
        }
    }
    catch (error) {
        return { msg: "Internal server error" };
    }
});
exports.getContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getById = yield contact_models_1.User.findById(id);
        if (getById === null) {
            return { msg: "Not found" };
        }
        else {
            return { msg: "Success", data: getById };
        }
    }
    catch (error) {
        return { msg: "Internal server error" };
    }
});

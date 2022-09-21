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
const contactService = require("../services/contact-service");
exports.addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const valid = yield (0, contact_models_1.isUser)(user);
        if (valid) {
            const addUser = yield contactService.insertContact(user);
            return res.json({ msg: "success", data: addUser });
        }
        else {
            return res.json({ msg: "error" });
        }
    }
    catch (error) {
        return res.json({ err: error });
    }
});
exports.getAllContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllData = yield contactService.getAllContact();
        return res.json({ data: getAllData, msg: "Retrieve Successfully" });
    }
    catch (error) {
        return res.json({ err: error, msg: "Internal server error" });
    }
});
exports.removeContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (id) {
            const removeById = yield contactService.removeContactById(id);
            return res.json({ msg: "Remove Successfully", data: removeById });
        }
        else {
            return res.json({ msg: "Bad Request" });
        }
    }
    catch (error) {
        return res.json({ data: error, msg: "Internal server error" });
    }
});
exports.updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.body;
        const update = yield contactService.updateContact(param);
        return res.json({ msg: "Updated Successfully", data: update });
    }
    catch (error) {
        return res.json({ data: error, msg: "Internal server error" });
    }
});
exports.getContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        if (id) {
            const getById = yield contactService.getContactById(id);
            return res.json({ data: getById, msg: "Retrieve Successfully" });
        }
        else {
            return res.json({ msg: "Bad Request" });
        }
    }
    catch (error) {
        return res.json({ data: error, msg: "Internal server error" });
    }
});

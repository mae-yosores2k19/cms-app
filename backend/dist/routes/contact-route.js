"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contactController = require("../controllers/contact-controller");
router.post("/addContact", contactController.addContact);
router.get("/getAllContact", contactController.getAllContact);
router.post("/removeContactById", contactController.removeContactById);
router.post("/getContactById", contactController.getContactById);
router.put("/updateContact", contactController.updateContact);
exports.default = router;

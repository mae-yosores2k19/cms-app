import express from "express";
const router = express.Router();
const contactController = require("../controllers/contact-controller");

router.post("/addContact", contactController.addContact);
router.get("/getAllContact", contactController.getAllContact);
router.post("/removeContactById", contactController.removeContactById);
router.post("/getContactById",contactController.getContactById)
router.put("/updateContact", contactController.updateContact);


export default router;

const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.deleteContactById);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  contactsController.updateContactById
);

module.exports = router;

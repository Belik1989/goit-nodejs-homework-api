const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");
const { validateBodyFavorite } = require("../../decorators");
const { isValidId, authenticate } = require("../../middlewares");

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavorite(schemas.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);
router.delete("/:contactId", isValidId, contactsController.deleteContactById);
module.exports = router;

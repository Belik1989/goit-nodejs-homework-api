// const contacts = require("../models/contacts");
const Contact = require("../models/contact");

const { RequestError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContactById: ctrlWrapper(deleteContactById),
};

const fs = require('fs').promises;
const path = require('path');

const pathContacts = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const allContacts = await fs.readFile(pathContacts);
  return JSON.parse(allContacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactToFind = contacts.find(contact=>contact.id===contactId);
  return contactToFind || null;
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

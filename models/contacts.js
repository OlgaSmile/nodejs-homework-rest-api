const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require('nanoid');

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

const removeContact = async (id) => {
  const contacts = await fs.readFile(pathContacts);
  const index = contacts.findIndex(contact=>contact.id===id);
  if(index === -1){
    return null
  }

  const [result] = contacts.splice(index, 1);

  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

  return result;
}

const addContact = async ({name, email, phone}) => {

  const contacts = await listContacts();

  const newContact ={
    id: nanoid(),
    name,
    email,
    phone
  }

  contacts.push(newContact);

  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (id, body) => {

  const contacts = await listContacts();
  const index = contacts.findIndex(contact=>contact.id===id);
  if(index === -1){
    return null
  }

  contacts[index] = {id, ...body}

  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2));

  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

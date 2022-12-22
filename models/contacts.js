// // const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const dataStr = await fs.readFile(contactsPath, "utf-8");
  const dataParse = JSON.parse(dataStr);
  return dataParse;
}

async function getContactById(id) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === id);
  return contactById;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);

  if (contactById) {
    const newArray = allContacts.filter((contacts) => {
      return contacts.id !== contactId;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newArray));
    return contactById;
  }
}

async function addContact(body) {
  const allContacts = await listContacts();

  const newContact = {
    id: shortid.generate(),
    ...body,
  };

  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const id = contactId;
  allContacts[contactIndex] = { id, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};

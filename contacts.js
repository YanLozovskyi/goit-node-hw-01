const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
// const DetectFileEncoding = require("detect-file-encoding-and-language");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// Возвращает массив контактов
const listContacts = async () => {
  try {
    // const fileEncoding = await DetectFileEncoding(contactsPath);
    // console.log(fileEncoding);
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

// Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    return data.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error(error);
  }
};

// Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }

    const deletedContact = contacts.splice(index, 1);

    await updateContacts(contacts);
    return deletedContact;
  } catch (error) {
    console.error(error);
  }
};

// Возвращает объект добавленного контакта.
const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();

    const newContact = { id: nanoid(), name, email, phone };

    contacts.push(newContact);

    await updateContacts(contacts);

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

// Возвращает обьект обновлённого контакта
const updateContact = async (id, data) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return null;
    }

    contacts[index] = { id, ...data };

    await updateContacts(contacts);

    return contacts[index];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// listContacts();

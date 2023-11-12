const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
const path = require("path");
// const DetectFileEncoding = require("detect-file-encoding-and-language");
const contactsPath = path.join(__dirname, "db", "contacts.json");

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
    const data = await listContacts();
    const index = data.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }

    const deletedContact = data.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return deletedContact;
  } catch (error) {
    console.error(error);
  }
};

// Возвращает объект добавленного контакта.
const addContact = async ({ id, name, email, phone }) => {
  try {
    const data = await listContacts();

    const newContact = { id, name, email, phone };

    const newData = [...data, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };

// listContacts();

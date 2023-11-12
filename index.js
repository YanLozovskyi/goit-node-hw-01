const operations = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await operations.listContacts());
      break;

    case "get":
      console.log(await operations.getContactById(id));
      break;

    case "add":
      console.log(await operations.addContact({ name, email, phone }));
      break;

    case "remove":
      console.log(await operations.removeContact(id));
      break;
    case "update":
      console.log(await operations.updateContact(id, { name, email, phone }));
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

const path = require("path");
const fs = require("node:fs");
const {
  addEmployee,
  listDB,
  editDB,
  deleteEmployee,
} = require("./cradOperation");

const arg = process.argv;
const [, , cmd, ...args] = arg;

const pathFile = path.join(__dirname, "employees.json");
if (!fs.existsSync(pathFile)) {
  fs.writeFileSync(pathFile, "[]", "utf-8"); //create file if it not exsist
}

console.log("----------------------------------------------------------------");
console.log("^-^Welcome To my Employees DB^-^");
console.log("----------------------------------------------------------------");

if (cmd === "add") {
  addEmployee(args);
} else if (cmd === "delete") {
  deleteEmployee(args);
} else if (cmd === "list") {
  listDB();
  //listEmps();
} else if (cmd === "edit") {
  editDB(args);
} else {
  console.log("Unknown command. Use: add, list, edit, or delete");
}

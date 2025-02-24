const fs = require("node:fs");
const path = require("path");
const validation = require("./vaildation");

const pathFile = path.join(__dirname, "employees.json");

let DB = JSON.parse(fs.readFileSync(pathFile, "utf-8"));

function addEmployee(args) {
  //loop in args split using = and key:value before = put as key  and after = push as value
  const data = {};
  const id = DB.length > 0 ? DB[DB.length - 1].ID + 1 : 1;
  data.ID = id;

  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    let keysplit = key.slice(2);
    if (keysplit.toLowerCase() === "id") {
      console.log(
        "Warning: The 'ID' field is automatically generated and cannot be modified."
      );
    } else data[keysplit] = value;
  });
  if (validation(data) !== -1) {
    DB.push(data);
    fs.writeFileSync(pathFile, JSON.stringify(DB, null, 2));
    console.log("Employee added succesfully");
  }
}

function listDB() {
  const DB = JSON.parse(fs.readFileSync(pathFile, "utf-8"));

  if (DB.length === 0) {
    console.log("Sorry DataBase is empty");
  } else {
    //[{}] ->[key:value]->${key}:${value}
    console.log(
      DB.map((employee) => {
        return Object.entries(employee)
          .map(([key, value]) => {
            return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
          })
          .join(", ");
      }).join("\n")
    );
  }
}

function editDB(args) {
  const dataID = Number(args[0]);
  let employee = DB.find((emp) => emp.ID === dataID);
  if (!employee) {
    console.log("Invaild ID");
    return;
  } else {
    //get the feild and edit on it the write it into file
    args.splice(1).forEach((arg) => {
      const [key, value] = arg.split("=");
      let keysplit = key.slice(2);
      if (keysplit.toLowerCase() === "id") {
        console.log(
          "Warning: The 'ID' field is automatically generated and cannot be modified."
        );
      } else employee[keysplit] = value;
    });
    validation(employee);
    fs.writeFileSync(pathFile, JSON.stringify(DB, null, 2));
    console.log("Employee edited successfully");
  }
}

function deleteEmployee(args) {
  let DB = JSON.parse(fs.readFileSync(pathFile, "utf-8"));
  //loop in array and see if id == id of employee delete this object else print 'not found'
  const dataID = Number(args[0]);
  //console.log(dataID)
  const emp = DB.find((employee) => employee.ID === dataID);
  if (!emp) {
    console.log("Invaild ID");
    return;
  } else {
    DB = DB.filter((employee) => employee.ID !== dataID);
    fs.writeFileSync(pathFile, JSON.stringify(DB, null, 2));
    console.log("Employee deleted sucessfully");
  }
}
module.exports = { addEmployee, listDB, editDB, deleteEmployee };

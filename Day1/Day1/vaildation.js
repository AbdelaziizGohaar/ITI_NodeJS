const validator = require("validator");
function validation(data) {
  //validations
  if (!data.name || !data.email || !data.salary) {
    console.log("Error: name, email, salary are required!");
    return -1;
  }
  if (
    validator.isEmpty(data.name) ||
    !validator.isAlpha(data.name, "en-US", { ignore: " " })
  ) {
    console.log("Error: Name must contain only letters and spaces");
    return -1;
  }
  if (!validator.isEmail(data.email)) {
    console.log("Error: Invalid email, add like(user@example.com)");
    return -1;
  }

  const salary = parseFloat(data.salary);
  if (!validator.isFloat(data.salary.toString(), { min: 3000 })) {
    console.log(
      "Error: Invalid email. Please use the format (user@example.com)"
    );
    return -1;
  }
  data.salary = salary;

  data.yearsOfExperience = Number(data.yearsOfExperience);
  if (isNaN(data.yearsOfExperience)) {
    console.log("Error: yearsOfExperience must be a number.");
    return -1;
  }
  data.yearsOfExperience = Math.max(0, data.yearsOfExperience);

  const age = Number(data.age);
  if (!validator.isInt(data.age.toString(), { min: 20 })) {
    console.log("Error: Age must be positive and minimum age is 20");
    return -1;
  }

  data.age = age;

  const levels = ["Jr", "Mid-Level", "Sr", "Lead"];
  data.level = levels.includes(data.level) ? data.level : "Jr";
}
module.exports = validation;

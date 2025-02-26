import Employee from '../model/employees.js';
import mongoose from 'mongoose';

//========================= Create a new employee
const create = async (data) => {
    const employee = await Employee.create(data);
    return employee;
};

//========================= Get all employees
const getAll = async () => {
    const employees = await Employee.find({}, { password: 0 }).exec(); // Hide password
    return employees;
};

//========================= Get an employee by ID
const getById = async (id) => {
    const employee = await Employee.findById(id, { password: 0 }).exec(); // Hide password
    if (!employee) {
        throw new Error("Employee not found");
    }
    return employee;
};

//========================= Update an employee
const update = async (id, data) => {
    const employee = await Employee.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
    if (!employee) {
        throw new Error("Employee not found");
    }
    return employee;
};

//=========================Delete an employee
const remove = async (id) => {
    const employee = await Employee.findByIdAndDelete(id).exec();
    if (!employee) {
        throw new Error("Employee not found");
    }
    return employee;
};
//======================login
const login = async (data) => {
    const employee = await Employee.findOne({username: data.username}).exec();
    if (!employee) {
      throw new CustomError('User name or password is not correct', 401);
    }
    const isValidPassword = employee.comparePasswords(data.password);
    if (!isValidPassword) {
      throw new CustomError('User name or password is not correct', 401);
    }
    const token = jwt.sign({id: employee._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return token;
  };
export default{
    create,
    getAll,
    getById,
    update,
    remove
};

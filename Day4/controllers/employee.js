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

export default{
    create,
    getAll,
    getById,
    update,
    remove
};

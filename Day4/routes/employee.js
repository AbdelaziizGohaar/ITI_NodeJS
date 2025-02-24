import express from 'express';
import  EmployeeController from '../controllers/employee.js';
// import * as EmployeeController from '../controllers/index.js';

const router = express.Router();

//============= Create an employee (POST /employees)
router.post('/', async (req, res) => {
    try {
        const employee = await EmployeeController.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//============= Get all employees (GET /employees)
router.get('/', async (req, res) => {
    try {
        const employees = await EmployeeController.getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//============= Get an employee by ID (GET /employees/:id)
router.get('/:id', async (req, res) => {
    try {
        const employee = await EmployeeController.getById(req.params.id);
        res.json(employee);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

//============= Update (PATCH /employees/:id)
router.patch('/:id', async (req, res) => {
    try {
        const updatedEmployee = await EmployeeController.update(req.params.id, req.body);
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//============= Delete an employee (DELETE /employees/:id)
router.delete('/:id', async (req, res) => {
    try {
        await EmployeeController.remove(req.params.id);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;

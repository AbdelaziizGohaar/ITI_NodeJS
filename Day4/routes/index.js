import express from 'express';
import EmployeesRouter from './employee.js';
import LeavesRouter from './leaves.js';

const router = express.Router();

router.use('/employees', EmployeesRouter);
router.use('/leaves', LeavesRouter);



export default router;

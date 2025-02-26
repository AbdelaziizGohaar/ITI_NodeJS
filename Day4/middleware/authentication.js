import process from 'node:process';
import jwt from 'jsonwebtoken';
import Employee from '../models/employees.js';


const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  try {
    const payload = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const employee = await Employee.findById(payload.id).exec();
    
    req.employee = employee;
    next();
  } catch (error) {
    return res.status(401).json({error: 'Unauthorized'});
  }
};

export default authentication;

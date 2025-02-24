import mongoose from 'mongoose';
import Leave from '../model/leaves.js';

const submit = async (leave) => {
 //  const Leave = await Leave.create(leave);
  const newLeave = await Leave.create(leave); // 
  return newLeave;

};

const editLeave = async (id, updateLeave) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid leave ID');
    error.status = 400;
    throw error;
  }
  const Leave = await Leave.findByIdAndUpdate(id, updateLeave, {new: true, runValidators: true});
  if (!Leave) {
    const error = new Error('Leave not found');
    error.status = 404;
    throw error;
  }
  return Leave;
};

const getLeave = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid Employee ID');
    error.status = 400;
    throw error;
  }
  //  const empLeave = await Leave.find({empId: id}).populate('empId', 'firstName').exec();
  const empLeave = await Leave.find({ empId: new mongoose.Types.ObjectId(id) }).populate('empId', 'firstName').exec();

  if (!empLeave || empLeave.length === 0) {
    const error = new Error('No Leave found for this employee');
    error.status = 404;
    throw error;
  }
  return empLeave;
};

const getAll = async (filter, skip, limit) => {
  const leave = await Leave.find(filter).populate('empId', 'firstName').skip(skip).limit(limit).exec();
  if (!leave || leave.length === 0) {
    const error = new Error('No Leave found for this employee');
    error.status = 404;
    throw error;
  }
  return Leave;
};

export default {submit, editLeave, getLeave, getAll};

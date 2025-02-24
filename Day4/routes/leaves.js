import express from 'express';
import leavesController from '../controllers/leaves.js';
import {asyncWrapper} from '../utils/helper.js'; 


const router = express.Router();

// router.use((req, res, next)=>{
//   console.log("HELLO");
//   next()
// })

router.post('/', async (req, res, next) => {
    const [err, data] = await asyncWrapper(leavesController.submit(req.body));
    console.log('data', data);
    if (!err) return res.json(data);
    
    next({message: err.message, status: 422});
  });
  
  router.patch('/:id', async (req, res, next) => {
    const {id} = req.params;
    const updateLeave = req.body;
    const [err, leave] = await asyncWrapper(leavesController.editLeave(id, updateLeave));
    if (err) {
      return next({message: err.message, status: err.status || 422});
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: `the leave After Edit`,
      data: leave
    });
  });

   router.get('/employees/:id/leaves', async (req, res,next) => {
    const { id } = req.params;
    // const [err, data] = await asyncWrapper(leavesController.getLeaves(id));
    const [err, data] = await asyncWrapper(leavesController.getLeave(id));

    if (err) {
        return next({message: err.message, status: err.status || 422});
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: `the leaves of this employee are retrieved successfully`,
        data: data
      });
    
});

router.get('/', async (req, res,next) => {
    const filter = {};
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 10;
    
    if (req.query.status){
        filter.status = req.query.status;
    }
    if (req.query.empId){
      filter.empId = req.query.empId;
    }    
    const [err, data] = await asyncWrapper(leavesController.getAll(filter,skip,limit));
   
    
    if (err) {
        return next({message: err.message, status: err.status || 422});
      }
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: `the leaves are retrieved successfully`,
        data: data
      });
    
});
export default router;

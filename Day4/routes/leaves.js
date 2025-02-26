import express from 'express';
import leavesController from '../controllers/leaves.js';
import {asyncWrapper} from '../utils/helper.js'; 
import authentication from '../middleware/authentication.js';


const router = express.Router();

// router.use((req, res, next)=>{
//   console.log("HELLO");
//   next()
// })

 router.post('/', authentication ,async (req, res, next) => { 
   req.body.empId = req.employee._id;
    const [err, data] = await asyncWrapper(leavesController.submit(req.body));
    console.log('data', data);
    if (!err) return res.json(data);
    
    next({message: err.message, status: 422});
  });
  
  router.patch('/:id', async (req, res, next) => {
    const {id} = req.params;
    const leav = await Leaves.findById(id);
    if (leav.empId.toString() !== req.employee._id.toString()) {
    return next({message: 'error unauthorized', status: 401});
   }
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


router.get('/',authentication ,async (req, res,next) => {
    const filter = 
    {      
      empId: req.employee._id
    };
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

import mongoose from 'mongoose';

const LeaveSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['annual', 'casual', 'sick'] 
    },
    duration: {
        type: Number,
        required: true,
        min: 1 
    },
    status: {
        type: String,
        enum: ['inprogress', 'cancelled', 'ended'],
        default: 'inprogress'
    }
}, { timestamps: true });

// LeaveSchema.pre('save', function (next) {
//     if (this.isModified('status') && this.status === 'cancelled') {
//         Leave.findById(this._id).then(existingLeave => {
//             if (existingLeave?.status === 'ended') {
//                 return next(new Error("Cannot cancel a leave that has ended."));
//             }
//             next();
//         });
//     } else {
//         next();
//     }
// });

LeaveSchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'cancelled') {
        Leave.findById(this._id).then(existingLeave => {
            if (existingLeave?.status === 'ended') {
                next(new Error("Cannot cancel a leave that has ended."));
            } else {
                next();
            }
        }).catch(err => next(err));  
    } else {
        next();
    }
});


// Create Model
const Leave = mongoose.model('Leave', LeaveSchema);

export default Leave;

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Define Employee Schema
const EmployeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        trim: true,
        validate: {
            validator: function (value) {
                return !/\s/.test(value); // Ensure no spaces
            },
            message: "Username must not contain spaces."
        }
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        set: value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() // Capitalized
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        set: value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() // Capitalized
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

// Hash password before saving
EmployeeSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash password if modified
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Remove password & __v when converting to JSON
EmployeeSchema.set('toJSON', {
    transform: (doc, { __v, password, ...rest }) => rest
});


// Compare passwords method
EmployeeSchema.methods.comparePasswords = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create Employee Model
const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;

// Example usage in an async function
// async function checkPassword(employeeId, inputPassword) {
//     const employee = await Employee.findById(employeeId).exec();
//     if (!employee) {
//         console.log("Employee not found");
//         return;
//     }

//     const isMatch = await employee.comparePasswords(inputPassword);
//     console.log("Password Match:", isMatch);
// }

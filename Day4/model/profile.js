import mongoose from 'mongoose';

// Define schema
const ProfileSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    yearOfExperience: {
        type: Number,
        default: 0
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value); // Validate phone number (10 digits)
            },
            message: "Phone number must be 10 digits."
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email
            },
            message: "Invalid email format."
        }
    }
});

// Create Model
const Profile = mongoose.model('Profile', ProfileSchema);

export default Profile;

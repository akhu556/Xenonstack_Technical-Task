const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    }
})

// now we need to create a colections

const Registor = new mongoose.model("User", employeeSchema);

module.exports = Registor;
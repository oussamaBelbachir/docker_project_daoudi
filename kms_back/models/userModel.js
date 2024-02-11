const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        trim : true,
        required : [true, "Please tell us your Name !"],
    },
    last_name : {
        type : String,
        trim : true,
        required : [true, "Please tell us your Name !"]
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : [true, "Please tell us your Email !"],
        lowercase : true,
    },
    photo : String,
    direction_departments:{
        type : Object,
        required : [true, "This field is required !"],

    },
    role : {
        type : String,
        enum : ["admin","editor","reader"],
        default : "employee"
    },
    password : {
        type : String,
        required : [true,"Please provide a password !"],
        minLength : 8,
        select : false
    },
    passwordConfirm : {
        type : String,
        required : [true,"Please confirm your password !"],
        // Works just on SAVE !!!
        validate : {
            validator : function(val){
                return val === this.password
            },
            message : "Invalid Password Confirmation !!!"
        }
    },
    active : {
        type : Boolean,
        default : true
    }
});

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined;
    next();
});


userSchema.methods.correctPassword = async function(password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword);
}
// =================================================================

const User = mongoose.model("User",userSchema);

module.exports = User;
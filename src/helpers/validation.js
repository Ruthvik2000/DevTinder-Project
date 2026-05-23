const validator = require("validator")
const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter a vaid first or last name")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Enter a valid Email ID")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password")
    }
}

const validateEditProfileData = (req) =>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills"
    ];
    
    const isEditAllowed= Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    if (!isEditAllowed) return false;

    // 1. Normalize gender 
    if ("gender" in req.body && req.body.gender) {
        req.body.gender = req.body.gender.toLowerCase();
        if (req.body.gender === "other") req.body.gender = "others";
        const allowedGenders = ["male", "female","others"];
        if (!allowedGenders.includes(req.body.gender)) {
        return false;
        }
    }

    //2.Validate age
    if ("age" in req.body) {
    // allow null/undefined (optional) but reject invalid values
        const age = req.body.age;
        if (age === "" || age === null) return false; // or allow by returning true and handling separately
        if (typeof age !== "number" || Number.isNaN(age)) return false;
        if (age < 0) return false;
    }

    //3.Validate photoUrl
    if ("photoUrl" in req.body) {
        if (typeof req.body.photoUrl !== "string") return false;
    }

    return isEditAllowed; //return's the boolean value
    

};

module.exports = {
    validateSignupData,
    validateEditProfileData
}

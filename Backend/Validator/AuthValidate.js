let {body}=require("express-validator")

let validation=[
    body("Name").notEmpty().withMessage("name is required"),
    body("Email").notEmpty().withMessage("email is required"),
    body("Password").notEmpty().withMessage("password is required").isLength({min:6})
    ]

module.exports=validation
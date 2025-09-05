import { body } from "express-validator";

let validator=[
    body("Title").notEmpty().withMessage("title is required") ,
    body("BasePrice").matches(/^[0-9]+$/).notEmpty().withMessage("Only number is allowed"),
    body("Slots").matches(/^[0-9]+$/).notEmpty().withMessage("title is required"),
    body("Description").notEmpty().isLength({max:10000},"your content is very large").withMessage("description is required")
]

module.exports=validator
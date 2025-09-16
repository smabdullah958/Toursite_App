// let {body}=require("express-validator")

// let validation=[
//     body("ContactNumber").notEmpty().withMessage("field is required").
//     matches(/^\d{11}$/,"only number is allowed"),

// body("WhatsAppNumber").optional().withMessage("field is required").
//     matches(/^\d{11}$/,"only number is allowed"),

//     body("PickUpAddress").notEmpty().withMessage("password is required"),

//     body("NumberOfNoneAdultChild").withMessage("field is required").
//     matches(/^\d$/,"only number is allowed"),

//     body("NumberOfAdultChild").notEmpty().withMessage("name is required").
//     matches(/^\d$/,"only number is allowed"),

//     body("Days").notEmpty().withMessage("field is required").
//     matches(/^\d$/,"only number is allowed"),
    
//     body("TravelTime").notEmpty().withMessage("field is required").
    
//     body("TotalPrice").notEmpty().withMessage("field is required").
//     matches(/^\d$/,"only number is allowed"),
    
//     body("Date").notEmpty().withMessage("Date is required")
   
//     ]

// module.exports=validation

let {body}=require("express-validator")

let validation = [
  body("ContactNumber")
    .notEmpty().withMessage("Contact number is required")
    .matches(/^\d{11}$/).withMessage("Contact number must be exactly 11 digits"),

  body("WhatsAppNumber")
    .optional({checkFalsy: true })
    .matches(/^\d{11}$/).withMessage("WhatsApp number must be exactly 11 digits"),

  body("PickUpAddress")
    .notEmpty().withMessage("Pick up address is required"),

  body("NumberOfNoneAdultChild")
    .optional()
    .isInt({ min: 0 }).withMessage("Must be a number"),

  body("NumberOfAdultChild")
    .notEmpty().withMessage("Number of adult child is required")
    .isInt({ min: 1 }).withMessage("Must be a valid number"),

  body("Days")
    .notEmpty().withMessage("Days are required")
    .isInt({ min: 1 }).withMessage("Must be a valid number"),

  body("TravelTime")
    .notEmpty().withMessage("Travel time is required"),

  body("TotalPrice")
    .notEmpty().withMessage("Total price is required")
    .isInt({ min: 1 }).withMessage("Must be a number"),

  body("Date")
    .notEmpty().withMessage("Date is required")
]

module.exports=validation

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
    .optional().withMessage("Number of adult child is required")
    .isInt({ min: 1 }).withMessage("Must be a valid number"),

    body("Duration")
    .notEmpty().withMessage("Duration are required"),

    body("Category")
    .notEmpty().withMessage("Category are required"),

  body("TravelTime")
    .notEmpty().withMessage("Travel time is required"),

  body("TotalPrice")
    .notEmpty().withMessage("Total price is required")
    .isInt({ min: 1 }).withMessage("Must be a number"),

  body("Date")
    .notEmpty().withMessage("Date is required"),

    body("PaymentMethod")
    .notEmpty().isIn(["Stripe","Cash"]).withMessage("PaymentMethod is only Stripe or Cash")
  ]

module.exports=validation
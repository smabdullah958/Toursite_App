//package and destination validator
import { body } from "express-validator";

let validator=[
    body("Title").notEmpty().withMessage("title is required") ,
    body("BasePrice").matches(/^[0-9]+$/).notEmpty().withMessage("Only number is allowed"),

    //for a per person or a preivate booking and also fo ra private booking it has only a fixed unit
    body("PricingModel").isIn("PerPerson","FixedUnit").notEmpty().withMessage("pricing model si required"),
    
    body("Duration").notEmpty().withMessage("Only number is allowed"),
    
    body("Slots").matches(/^[0-9]+$/).notEmpty().withMessage("title is required"),
    body("CarCapacity").matches(/^[0-9]+$/).optional().withMessage("only number are allowed"),
    
    body("Category").notEmpty().withMessage("Category is allowed"),
    body("Description").notEmpty().isLength({max:10000},"your content is very large").withMessage("description is required"),
    // body("TravelTimes").isArray({min:1}).withMessage("Travel time is required")

    body("TravelTimes")
    .isArray({ min: 1 })
    .withMessage(" travel time is required")
    .custom((value) => {
      if (!value.every((item) => item.time && typeof item.time === "string" && item.time.trim() !== "")) {
        throw new Error("All travel times must be objects with a non-empty time string");
      }
      return true;
    })
]

module.exports=validator
//package and destination validator
import { body } from "express-validator";

let validator=[
    body("Title").notEmpty().withMessage("title is required") ,
    body("BasePrice").matches(/^[0-9]+$/).notEmpty().withMessage("Only number is allowed"),
    body("Slots").matches(/^[0-9]+$/).notEmpty().withMessage("title is required"),
    body("Description").notEmpty().isLength({max:10000},"your content is very large").withMessage("description is required"),
    // body("TravelTimes").isArray({min:1}).withMessage("Travel time is required")
body("TravelTimes")
    .isArray({ min: 1 })
    .withMessage("At least one travel time is required")
    .custom((value) => {
      if (!value.every((item) => item.time && typeof item.time === "string" && item.time.trim() !== "")) {
        throw new Error("All travel times must be objects with a non-empty time string");
      }
      return true;
    })
]

module.exports=validator
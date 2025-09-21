let {body}=require ("express-validator")

let validation=[
    body("Name").notEmpty().withMessage("name is required"),
    body("Title").notEmpty().withMessage("Title is required"),
    body("Description").notEmpty().withMessage("Description is required").isLength({max:5000},"your description is large"),
    body("Img").notEmpty().withMessage("Image is required"),
    body("Facebook").optional(),
     body("Linkedin").optional(),
      body("Email").optional()
]

module.exports=validation
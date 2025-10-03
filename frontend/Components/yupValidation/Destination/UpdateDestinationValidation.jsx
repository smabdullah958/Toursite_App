// import * as yup from "yup";

// const MAX_FILE_SIZE = 300 * 1024 ; // 300kb
//     const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

// // ✅ Validation Schema
// const schema = yup.object({
//   Title: yup.string().required("Title is required"),
// Slots:yup.number().typeError("slots must be number").positive("slots must be positive number").required("price required"),
// TravelTimes:yup.array().of(yup.object({ 
//   time:yup.string().required("Time is required")
// })
// ).min(1, "At least one time is required"),

// BasePrice: yup.array().length({min:1})
//           .of(
//             yup.number()
//                 .typeError("Each price must be a valid number")
//                 .positive("Each price must be positive")
//                 .required("Price value is required"))
//             .required("Price is required"),

//     // ✅ Image optional on update
//   Image: yup
//     .mixed()
//     .nullable()
//     .test("fileSize", "File must be less than 300kb", (value) => {
//       if (!value || value.length === 0) return true; // allow empty
//       return value[0].size <= MAX_FILE_SIZE;
//     })
//     .test("fileFormat", "Unsupported Format", (value) => {
//       if (!value || value.length === 0) return true; // allow empty
//       return SUPPORTED_FORMATS.includes(value[0].type);
//     }),
//     Description: yup.string().required("Description is required"),
//       Category: yup.array().required("Category is required").length({min:1}),
//       //here it is used foa  duration ofa  destination bro 
//       Duration: yup.string().required("Travel Duration is required"),
    
// });


// export default schema







import * as yup from "yup";

const MAX_FILE_SIZE = 300 * 1024 ; // 300kb
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

// Define the validation for a single Booking Option object
const BookingOptionSchema = yup.object({
    Category: yup.string().required("Category name is required"),
    
    // BasePrice is required for every category
    BasePrice: yup.number()
        .typeError("Price must be a valid number")
        .positive("Price must be positive")
        .required("Base Price is required"),

    // PricingModel is required for every category
    //it is used for a per person and also for a private booking or a fixed unit 
    PricingModel: yup.string()
        .oneOf(["PerPerson", "FixedUnit"], "Invalid pricing model selected")
        .required("Pricing model is required"),
    
    // Duration is required for every category
    Duration: yup.string().required("Travel Duration is required"),

    // Slots/Car Count is required for every category
    Slots: yup.number()
        .typeError("Slots/Car count must be a number")
        .positive("Slots/Car count must be positive")
        .required("Slots/Car count is required"),
        
    // CarCapacity is conditional, but must be defined in the schema
    CarCapacity: yup.number().optional().nullable()
        .typeError("Car Capacity must be a number")
        .min(1, "Capacity must be at least 1")
});


// ✅ Validation Schema for the entire form
const schema = yup.object({
    Title: yup.string().required("Title is required"),
    
    TravelTimes: yup.array().of(yup.object({ 
        time: yup.string().required("Time is required")
    })).min(1, "At least one travel time is required"),

    // 🚀 CRITICAL FIX: Match the field name and structure
    BookingOption: yup.array()
        .of(BookingOptionSchema) // Use the object schema defined above
        .min(1, "At least one Booking Category is required"),

    
       Image: yup
     .mixed()
     .nullable()
     .test("fileSize", "File must be less than 300kb", (value) => {
       if (!value || value.length === 0) return true; // allow empty
       return value[0].size <= MAX_FILE_SIZE;
     })
     .test("fileFormat", "Unsupported Format", (value) => {
       if (!value || value.length === 0) return true; // allow empty
       return SUPPORTED_FORMATS.includes(value[0].type);
     }),


    Description: yup.string().required("Description is required"),
});


export default schema;
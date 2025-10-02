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
// ).min(1),

//   BasePrice: yup.number()
//                 .typeError(" price must be a valid number")
//                 .positive(" price must be positive")
//                 .required("Price value is required"),

//     Image: yup.mixed().required("Image is required")
//    .test(
//                  'fileSize',
//                  'File must be less than 300kb',
//                 //  value => value[0] && value.size <= MAX_FILE_SIZE
//                 //here first it check the value of a field and field is a Image
// // First, it checks if value exists (not null or undefined). If value is null, the whole condition becomes false.
// //              value[0] means "the first file uploaded". If no file is selected, value[0] will be undefined.
//                   value =>  value && value[0] && value[0].size <= MAX_FILE_SIZE

//            )
//             .test(
//                 'fileFormat',
//                 'Unsupported Format',
//                 // value => value && SUPPORTED_FORMATS.includes(value.type)
//                 value=>value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
//               ),
//   Description: yup.string().required("Description is required"),
//   Category: yup.array().required("Category is required").length({min:1}),
//   //here it is used foa  duration ofa  destination bro 
//   Duration: yup.string().required("Travel Duration is required"),
//   //it is for a  per person or Fixed Unit for  a private booking
//   PricingModel:yup.string().oneOf(["PerPerson","FixedUnit"]).required("field is required"),

//   //for capcity of a car like 10 seater , 5 seater
//   CarCapacity:yup.number().optional().nullable()
//   });


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

    // 💡 REMOVED: Slots, BasePrice, Category, Duration, PricingModel, CarCapacity
    // They are now correctly nested inside BookingOption
    
    Image: yup.mixed().required("Image is required")
        .test(
            'fileSize',
            'File must be less than 300kb',
            value => value && value[0] && value[0].size <= MAX_FILE_SIZE
        )
        .test(
            'fileFormat',
            'Unsupported Format',
            value => value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
        ),

    Description: yup.string().required("Description is required"),
});


export default schema;
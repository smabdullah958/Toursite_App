import * as yup from "yup";
const MAX_FILE_SIZE = 300 * 1024 ; // 300kb
    const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

    // Define the validation for a single Booking Option object like base price , slots category
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
    

// ✅ Validation Schema
export const schema = yup.object({
  Title: yup.string().required("Title is required"),

  Description: yup.string().required("Description is required"),

  TravelTimes:yup.array().of(yup.object({ 
    time:yup.string().required("Time is required")
  })
  ).min(1, "At least one time is required"),
  
 
        Image1: yup.mixed().required("Image is required")
                  .test(
                   'fileSize',
                   'File must be less than 300kb',
                  //  value => value[0] && value.size <= MAX_FILE_SIZE
                  //here first it check the value of a field and field is a Image
  // First, it checks if value exists (not null or undefined). If value is null, the whole condition becomes false.
  //              value[0] means "the first file uploaded". If no file is selected, value[0] will be undefined.
                    value =>  value && value[0] && value[0].size <= MAX_FILE_SIZE
  
             )
              .test(
                  'fileFormat',
                  'Only images (jpeg, jpg, png)  are allowed!',
                  // value => value && SUPPORTED_FORMATS.includes(value.type)
                  value=>value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
                ),

                 Image2: yup.mixed().required("Image is required")
                  .test(
                   'fileSize',
                   'File must be less than 300kb',
                  //  value => value[0] && value.size <= MAX_FILE_SIZE
                  //here first it check the value of a field and field is a Image
  // First, it checks if value exists (not null or undefined). If value is null, the whole condition becomes false.
  //              value[0] means "the first file uploaded". If no file is selected, value[0] will be undefined.
                    value =>  value && value[0] && value[0].size <= MAX_FILE_SIZE
  
             )
              .test(
                  'fileFormat',
                  'Only images (jpeg, jpg, png)  are allowed!',
                  // value => value && SUPPORTED_FORMATS.includes(value.type)
                  value=>value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
                ),

                Image3: yup.mixed()
                    .test(
                   'fileSize',
                   'File must be less than 300kb',
                  //  value => value[0] && value.size <= MAX_FILE_SIZE
                  //here first it check the value of a field and field is a Image
  // First, it checks if value exists (not null or undefined). If value is null, the whole condition becomes false.
  //              value[0] means "the first file uploaded". If no file is selected, value[0] will be undefined.

                    value =>{   if(!value || value.length===0) return true; //skip validation if no file is selected
                      return            value && value[0] && value[0].size <= MAX_FILE_SIZE
                    }
             )
              .test(
                  'fileFormat',
                  'Only images (jpeg, jpg, png)  are allowed!',
                  // value => value && SUPPORTED_FORMATS.includes(value.type)
                  value=>{ 
                    if(!value || value.length===0) return true; //skip validation if no file is selected
                   return  SUPPORTED_FORMATS.includes(value[0].type)
                  }
                ).optional(),

                   Image4: yup.mixed().optional()
                    .test(
                   'fileSize',
                   'File must be less than 300kb',
                  //  value => value[0] && value.size <= MAX_FILE_SIZE
                  //here first it check the value of a field and field is a Image
  // First, it checks if value exists (not null or undefined). If value is null, the whole condition becomes false.
  //              value[0] means "the first file uploaded". If no file is selected, value[0] will be undefined.
                    value => {
                       if(!value || value.length===0) return true; //skip validation if no file is selected
                      return            value && value[0] && value[0].size <= MAX_FILE_SIZE
                    }
             )
              .test(
                  'fileFormat',
                  'Only images (jpeg, jpg, png)  are allowed!',
                  // value => value && SUPPORTED_FORMATS.includes(value.type)
                  value=>{ 
                    if(!value || value.length===0) return true; //skip validation if no file is selected
                  return  SUPPORTED_FORMATS.includes(value[0].type)
                  }
                ),

                Image5: yup.mixed().optional()
                  .test(
                   'fileSize',
                   'File must be less than 300kb',
                  //  value => value[0] && value.size <= MAX_FILE_SIZE
                  //here first it check the value of a field and field is a Image
  // First, it checks if value exists (not null or undefined). If value is null, the whole condition becomes false.
  //              value[0] means "the first file uploaded". If no file is selected, value[0] will be undefined.
                    value =>{
                      if(!value || value.length===0) return true; //skip validation if no file is selected
                      return            value && value[0] && value[0].size <= MAX_FILE_SIZE
  
                    }
                      )
              .test(
                  'fileFormat',
                  'Only images (jpeg, jpg, png)  are allowed!',
                  // value => value && SUPPORTED_FORMATS.includes(value.type)
                  value=>{
                    if(!value || value.length===0) return true; //skip validation if no file is selected
                    return SUPPORTED_FORMATS.includes(value[0].type)

                  }
                ),
              Description: yup.string().required("Description is required"),

               //   the field name and structure
                  BookingOption: yup.array()
                      .of(BookingOptionSchema) // Use the object schema defined above
                      .min(1, "At least one Booking Category is required")
              
            });
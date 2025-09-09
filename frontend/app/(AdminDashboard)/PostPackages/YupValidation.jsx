import * as yup from "yup";
const MAX_FILE_SIZE = 300 * 1024 ; // 300kb
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

// ✅ Validation Schema
export const schema = yup.object({
  Title: yup.string().required("Title is required"),
Slots:yup.number().typeError("slots must be number").positive("slots must be positive number").required("price required"),
  BasePrice: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  Description: yup.string().required("Description is required"),
 
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
                  'Unsupported Format',
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
                  'Unsupported Format',
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
                  'Unsupported Format',
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
                  'Unsupported Format',
                  // value => value && SUPPORTED_FORMATS.includes(value.type)
                  value=>{ 
                    if(!value || value.length===0) return true; //skip validation if no file is selected
                    SUPPORTED_FORMATS.includes(value[0].type)
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
                  'Unsupported Format',
                  // value => value && SUPPORTED_FORMATS.includes(value.type)
                  value=>{
                    if(!value || value.length===0) return true; //skip validation if no file is selected
                    SUPPORTED_FORMATS.includes(value[0].type)

                  }
                ),

   
            });


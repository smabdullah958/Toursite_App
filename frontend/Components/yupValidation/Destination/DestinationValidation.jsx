import * as yup from "yup";

const MAX_FILE_SIZE = 300 * 1024 ; // 300kb
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

// ✅ Validation Schema
const schema = yup.object({
  Title: yup.string().required("Title is required"),
Slots:yup.number().typeError("slots must be number").positive("slots must be positive number").required("price required"),
TravelTimes:yup.array().of(yup.object({ 
  time:yup.string().required("Time is required")
})
).min(1),

  BasePrice: yup.array().length({min:1})
          .of(
            yup.number()
                .typeError(" price must be a valid number")
                .positive(" price must be positive")
                .required("Price value is required")),

    Image: yup.mixed().required("Image is required")
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
  Description: yup.string().required("Description is required"),
  Category: yup.array().required("Category is required").length({min:1}),
  //here it is used foa  duration ofa  destination bro 
  Duration: yup.string().required("Travel Duration is required"),

});


export default schema
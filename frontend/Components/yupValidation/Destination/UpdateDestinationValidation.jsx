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
).min(1, "At least one time is required"),

  BasePrice: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
    // ✅ Image optional on update
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


export default schema
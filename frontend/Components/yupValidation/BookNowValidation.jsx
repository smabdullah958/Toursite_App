import * as yup from "yup";

// ✅ Validation Schema
export const schema = yup.object({
ContactNumber:yup
  .string()
  .required("field is required")
  .test("len", "WhatsApp number must be exactly 11 digits", 
    (val) => !val || /^\d{11}$/.test(val)),

WhatsAppNumber: yup
  .string()
  .nullable()
  .notRequired()
  .test("len", "WhatsApp number must be exactly 11 digits", 
    (val) => !val || /^\d{11}$/.test(val)
  ),

  PickUpAddress:yup.string().required("pick up address is required"),

    NumberOfAdultChild: yup.number()
    .typeError("Number of child must be a number")
    .positive("Number of child must be positive")
    .required("field is required"),

    Days:yup.number()
    .typeError("Days must be a number")
    .positive("Days must be positive")
    .required("Number of Days is required"),

            });
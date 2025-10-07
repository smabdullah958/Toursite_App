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
    .default(1)
    .required("field is required"),

    NumberOfNoneAdultChild: yup.number()
    .typeError(" child must be a number")
    .min(0,"Number of child can not be negative")
    .default(0)
    .required("field is required"),

    Duration:yup.string().required("Duration is required"),

    Category:yup.string().required("Category is required"),

      PricingModel: yup.string().oneOf(["PerPerson", "FixedUnit"]).notRequired(),


   
    Date:yup.string()
  .required("Date is required"),
  
  TravelTime:yup.string().required("field is required"),

PaymentMethod:yup.string().oneOf(["Stripe","Cash"]).required("PaymentMethod is Stripe or Cash"),
TotalPrice:yup.number()
    .max(999999.99, "Total price cannot exceed 999,999.99")
            });
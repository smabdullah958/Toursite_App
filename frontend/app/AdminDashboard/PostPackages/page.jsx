// // "use client";
// // import React, { useState,useEffect } from "react";
// // //usefieldarray is used for a dynamic input field like user can add and remove fields
// // import { useForm,useFieldArray } from "react-hook-form";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // //it contain the validation schema
// // import { schema } from "@/Components/yupValidation/PostPackageYupValidation";
// // import { useDispatch, useSelector } from "react-redux";
// // import PostPackageThunck  from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/PostPackageThunck"
// // import Loader from "@/Components/Loader";
// // import { useRouter } from "next/navigation";
// // //clear all the state
// // import { clearState } from "@/Libraries/ReduxToolkit/Slices/Packages/PostPackageSlice";

// // const PostPackage = () => {
// //   let router=useRouter();
// //   let dispatch = useDispatch();
// //   //PostPackageSlice is come forma  store
// //   let {success,loading}=useSelector((state)=>state.PostPackageSlice)

// //   const {
// //     register,
// //     handleSubmit,
// //     control,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: yupResolver(schema),
// //         defaultValues:{
// //       TravelTimes:[{time:""}] // start with one empty time
// //         }
// //   });
// // // fields: gives  the list of all time objects in your form.

// // // append: adds  new time object (like { time: "" }).

// // // remove: deletes one.

// //     const { fields, append, remove } = useFieldArray({
// //   control,  // comes from useForm(), it controls the whole form state 
// //     name: "TravelTimes", 
// //      //tells react-hook-form that this field array is bound to your form’s TravelTimes field.
// //   });
  

// //   let [AddImages,SetAddImages]=useState(0)

// //   const handleButton = (Data) => {
// //     console.log("Form Data:", Data);

// //     // Dispatch the action to post the package
// //     dispatch(PostPackageThunck(Data));
// //   };

// //   useEffect(()=>{
// //     if(success){
// //       router.push("/")
// //       dispatch(clearState())
// //     }
// //   })

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
// //       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
// //         <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">
// //           🏝️ Post a Package
// //         </h2>

// //         <div  className="space-y-6">
// //           {/* Title */}
// //           <div>
// //             <label className="block text-gray-700 font-semibold mb-2">
// //               Title
// //             </label>
// //             <input
// //               {...register("Title")}
// //               placeholder="e.g. Beautiful Beach"
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //             />
// //             <p className="text-red-500 text-sm mt-1">
// //               {errors.Title?.message}
// //             </p>
// //           </div>

// //           {/* Price */}
// //           <div>
// //             <label className="block text-gray-700 font-semibold mb-2">
// //               Price ($)
// //             </label>
// //             <input
// //               type="number"
// //               {...register("BasePrice")}
// //               placeholder="e.g. 250"
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //             />
// //             <p className="text-red-500 text-sm mt-1">
// //               {errors.BasePrice?.message}
// //             </p>
// //           </div>

// //           {/* Price */}
// //           <div>
// //             <label className="block text-gray-700 font-semibold mb-2">
// //               Available Slots
// //             </label>
// //             <input
// //               type="number"
// //               {...register("Slots")}
// //               placeholder="e.g. 50"
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //             />
// //             <p className="text-red-500 text-sm mt-1">
// //               {errors.Slots?.message}
// //             </p>
// //           </div>


// // {/* Travel Times */}
// // <div>
// //   <label className="block text-gray-700 font-semibold mb-2">
// //     Travel Times
// //   </label>
// //   {fields.map((field, index) => (
// //     <div key={field.id} className="flex items-center gap-2 mb-2">
// //       <input
// //         type="time"
// //         {...register(`TravelTimes.${index}.time`)} // ✅ bind field
// //         className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //       />
// //       {fields.length>1 && (
// //       <button
// //         type="button"
// //         onClick={() => remove(index)}
// //         className="bg-red-200 text-white px-3 py-2 rounded-lg hover:bg-red-300 duration-300 transition"
// //       >
// //         ❌
// //       </button>
// //       )}
// //     </div>
// //   ))}
// //   <p className="text-red-400 text-sm mt-1">
// //     {errors.TravelTimes?.message || errors.TravelTimes?.[0]?.time?.message}
// //   </p>
// //   <button
// //     type="button"
// //     onClick={() => append({time:""})}
// //     className="mt-2 bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 duration-300 transition"
// //   >
// //     ➕ Add Time
// //   </button>
// // </div>

// //           {/* required */}
// //                    <div>
// //             <label className="block text-gray-700 font-semibold mb-2">
// //               Image Upload (1 is required)
// //             </label>
// //             <input
// //               type="file"
// //               accept="image/png ,image/jpeg "
// //               {...register("Image1")}
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
// //             />
// //             <p className="text-red-500 text-sm mt-1">{errors.Image1?.message}</p>
// //               </div>

// //               {/* required */}
// //                    <div>
// //                       <label className="block text-gray-700 font-semibold mb-2">
// //               Image Upload (2 is required)
// //             </label>
// //             <input
// //               type="file"
// //               accept="image/png ,image/jpeg "
// //               {...register("Image2")}
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
// //             />
// //             <p className="text-red-500 text-sm mt-1">{errors.Image2?.message}</p>
// //               </div>
// //               {/* Optional */}
// //               {AddImages>=1 && (
// //               <div>
// //                       <label className="block text-gray-700 font-semibold mb-2">
// //               Image Upload (3 is optional)
// //             </label>
// //             <input
// //               type="file"
// //               accept="image/png ,image/jpeg"
// //               {...register("Image3")}
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
// //             />
// //             <p className="text-red-500 text-sm mt-1">{errors.Image3?.message}</p>
// //               </div>
// //               )}
// //               {AddImages>=2 && (
// //               <div>
// //                       <label className="block text-gray-700 font-semibold mb-2">
// //               Image Upload (4 is optional)
// //             </label>
// //             <input
// //               type="file"
// //               accept="image/png ,image/jpeg"
// //               {...register("Image4")}
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
// //             />
// //             <p className="text-red-500 text-sm mt-1">{errors.Image4?.message}</p>
// //               </div>
// //               )}
// //               {AddImages>=3 && (
// //               <div>
// //                       <label className="block text-gray-700 font-semibold mb-2">
// //               Image Upload (5 is optional)
// //             </label>
// //             <input
// //               type="file"
// //               accept=" image/png ,image/jpeg"
// //               {...register("Image5")}
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
// //             />
// //             <p className="text-red-500 text-sm mt-1">{errors.Image5?.message}</p>
// //               </div>
// //               )}

// //               {/* add button */}
// //               {AddImages<3 && (
// //               <button    disabled={loading}    onClick={()=>SetAddImages(AddImages+1)}  className={`px-4 py-2 bg-blue-300 text-white rounded-lg shadow  ${loading?" cursor-not-allowed opacity-20":"hover:bg-blue-400 transition"}`}> ➕ Add More Images</button>
// //               )}
// //           {/* Description */}
// //           <div>
// //             <label className="block text-gray-700 font-semibold mb-2">
// //               Description
// //             </label>
// //             <textarea
// //               {...register("Description")}
// //               rows="4"
// //               placeholder="Write a short description..."
// //               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
// //             />
// //             <p className="text-red-500 text-sm mt-1">
// //               {errors.Description?.message}
// //             </p>
// //           </div>

// //           {/* Submit Button */}
// //           <button disabled={loading}
// //           onClick={handleSubmit(handleButton)}
// //             className={`w-full py-3 mt-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg  opacity-100  ${loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700 hover:scale-105 transition-all duration-300 opacity-100'}`}>
// //             {loading?<Loader/>:"🚀 Post PostPackage"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default PostPackage;







// "use client";
//  import React, { useState,useEffect } from "react";
//  //usefieldarray is used for a dynamic input field like user can add and remove fields
//  import { useForm,useFieldArray } from "react-hook-form";
//  import { yupResolver } from "@hookform/resolvers/yup";
//  //it contain the validation schema
//  import { schema } from "@/Components/yupValidation/PostPackageYupValidation";



// const PostPackage = () => {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//         defaultValues:{
//       TravelTimes:[{time:""}] // start with one empty time
//         }
//   });
// // fields: gives  the list of all time objects in your form.

// // append: adds  new time object (like { time: "" }).

// // remove: deletes one.

//     const { fields, append, remove } = useFieldArray({
//   control,  // comes from useForm(), it controls the whole form state 
//     name: "TravelTimes", 
//      //tells react-hook-form that this field array is bound to your form's TravelTimes field.
//   });
  

//   let [AddImages,SetAddImages]=useState(0)

//   const handleButton = (Data) => {
//     console.log("Form Data:", Data);

//     // Mock dispatch for demo
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);
//     }, 2000);
//   };

//   useEffect(()=>{
//     if(success){
//       console.log("Redirecting to home...");
//       setSuccess(false);
//     }
//   })

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 p-6 relative overflow-hidden">
//       {/* Desert Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-full h-full" 
//              style={{
//                backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
//                                 radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
//                backgroundSize: '80px 80px, 40px 40px'
//              }}>
//         </div>
//       </div>

//       {/* Desert Dune Shapes */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-80 h-60 bg-gradient-to-br from-amber-200/20 to-yellow-300/10 rounded-full transform -translate-x-20 -translate-y-10 blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-amber-300/15 to-yellow-200/10 rounded-full transform translate-x-16 translate-y-16 blur-2xl"></div>
//       </div>

//       <div className="bg-gradient-to-br from-amber-50/95 to-yellow-50/90 w-full max-w-2xl rounded-2xl shadow-2xl shadow-amber-200/30 p-8 backdrop-blur-sm border border-amber-200/50 relative">
//         {/* Decorative Border */}
//         <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-amber-300/30 via-yellow-300/40 to-amber-400/30 pointer-events-none"></div>
        
//         <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
//           🏝️ Post a Package
//         </h2>

//         <div className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-amber-900 font-semibold mb-2">
//               Title
//             </label>
//             <input
//               {...register("Title")}
//               placeholder="e.g. Beautiful Beach"
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">
//               {errors.Title?.message}
//             </p>
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-amber-900 font-semibold mb-2">
//               Price ($)
//             </label>
//             <input
//               type="number"
//               {...register("BasePrice")}
//               placeholder="e.g. 250"
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">
//               {errors.BasePrice?.message}
//             </p>
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-amber-900 font-semibold mb-2">
//               Available Slots
//             </label>
//             <input
//               type="number"
//               {...register("Slots")}
//               placeholder="e.g. 50"
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">
//               {errors.Slots?.message}
//             </p>
//           </div>


// {/* Travel Times */}
// <div>
//   <label className="block text-amber-900 font-semibold mb-2">
//     Travel Times
//   </label>
//   {fields.map((field, index) => (
//     <div key={field.id} className="flex items-center gap-2 mb-2">
//       <input
//         type="time"
//         {...register(`TravelTimes.${index}.time`)} // ✅ bind field
//         className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
//       />
//       {fields.length>1 && (
//       <button
//         type="button"
//         onClick={() => remove(index)}
//         className="bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-3 rounded-lg hover:from-red-500 hover:to-red-600 duration-300 transition shadow-lg"
//       >
//         ❌
//       </button>
//       )}
//     </div>
//   ))}
//   <p className="text-red-600 text-sm mt-1 font-medium">
//     {errors.TravelTimes?.message || errors.TravelTimes?.[0]?.time?.message}
//   </p>
//   <button
//     type="button"
//     onClick={() => append({time:""})}
//     className="mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-yellow-600 duration-300 transition shadow-lg font-medium"
//   >
//     ➕ Add Time
//   </button>
// </div>

//           {/* required */}
//                    <div>
//             <label className="block text-amber-900 font-semibold mb-2">
//               Image Upload (1 is required)
//             </label>
//             <input
//               type="file"
//               accept="image/png ,image/jpeg "
//               {...register("Image1")}
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image1?.message}</p>
//               </div>

//               {/* required */}
//                    <div>
//                       <label className="block text-amber-900 font-semibold mb-2">
//               Image Upload (2 is required)
//             </label>
//             <input
//               type="file"
//               accept="image/png ,image/jpeg "
//               {...register("Image2")}
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image2?.message}</p>
//               </div>
//               {/* Optional */}
//               {AddImages>=1 && (
//               <div>
//                       <label className="block text-amber-900 font-semibold mb-2">
//               Image Upload (3 is optional)
//             </label>
//             <input
//               type="file"
//               accept="image/png ,image/jpeg"
//               {...register("Image3")}
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image3?.message}</p>
//               </div>
//               )}
//               {AddImages>=2 && (
//               <div>
//                       <label className="block text-amber-900 font-semibold mb-2">
//               Image Upload (4 is optional)
//             </label>
//             <input
//               type="file"
//               accept="image/png ,image/jpeg"
//               {...register("Image4")}
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image4?.message}</p>
//               </div>
//               )}
//               {AddImages>=3 && (
//               <div>
//                       <label className="block text-amber-900 font-semibold mb-2">
//               Image Upload (5 is optional)
//             </label>
//             <input
//               type="file"
//               accept=" image/png ,image/jpeg"
//               {...register("Image5")}
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image5?.message}</p>
//               </div>
//               )}

//               {/* add button */}
//               {AddImages<3 && (
//               <button    disabled={loading}    onClick={()=>SetAddImages(AddImages+1)}  className={`px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white rounded-lg shadow font-medium  ${loading?" cursor-not-allowed opacity-20":"hover:from-amber-500 hover:to-yellow-500 transition"}`}> ➕ Add More Images</button>
//               )}
//           {/* Description */}
//           <div>
//             <label className="block text-amber-900 font-semibold mb-2">
//               Description
//             </label>
//             <textarea
//               {...register("Description")}
//               rows="4"
//               placeholder="Write a short description..."
//               className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60 resize-none"
//             />
//             <p className="text-red-600 text-sm mt-1 font-medium">
//               {errors.Description?.message}
//             </p>
//           </div>

//           {/* Submit Button */}
//           <button disabled={loading}
//           onClick={handleSubmit(handleButton)}
//             className={`w-full py-4 mt-6 rounded-xl font-bold shadow-lg text-lg transition-all duration-300  ${loading ? 'cursor-not-allowed opacity-50 bg-amber-300' : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 hover:scale-105 hover:shadow-xl hover:shadow-amber-300/50 text-white'}`}>
//             {loading ? (
//               <div className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
//                 Processing...
//               </div>
//             ) : "🚀 Post PostPackage"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PostPackage;






"use client";
import React, { useState,useEffect } from "react";
//usefieldarray is used for a dynamic input field like user can add and remove fields
import { useForm,useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//it contain the validation schema
import { schema } from "@/Components/yupValidation/Packages/PostPackageYupValidation";
import { useDispatch, useSelector } from "react-redux";
import PostPackageThunck  from "@/Libraries/ReduxToolkit/AsyncThunck/Packages/PostPackageThunck"
import Loader from "@/Components/Loader";
import { useRouter } from "next/navigation";
//clear all the state
import { clearState } from "@/Libraries/ReduxToolkit/Slices/Packages/PostPackageSlice";

const PostPackage = () => {
  let router=useRouter();
  let dispatch = useDispatch();
  //PostPackageSlice is come forma  store
  let {success,loading}=useSelector((state)=>state.PostPackageSlice)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
        defaultValues:{
      TravelTimes:[{time:""}] // start with one empty time
        }
  });
// fields: gives  the list of all time objects in your form.

// append: adds  new time object (like { time: "" }).

// remove: deletes one.

    const { fields, append, remove } = useFieldArray({
  control,  // comes from useForm(), it controls the whole form state 
    name: "TravelTimes", 
     //tells react-hook-form that this field array is bound to your form's TravelTimes field.
  });
  

  let [AddImages,SetAddImages]=useState(0)

  const handleButton = (Data) => {
    console.log("Form Data:", Data);

    // Dispatch the action to post the package
    dispatch(PostPackageThunck(Data));
  };

  useEffect(()=>{
    if(success){
      router.push("/")
      dispatch(clearState())
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 p-6 relative overflow-hidden">
      {/* Desert Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
               backgroundSize: '80px 80px, 40px 40px'
             }}>
        </div>
      </div>

      {/* Desert Dune Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-60 bg-gradient-to-br from-amber-200/20 to-yellow-300/10 rounded-full transform -translate-x-20 -translate-y-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-amber-300/15 to-yellow-200/10 rounded-full transform translate-x-16 translate-y-16 blur-2xl"></div>
      </div>

      <div className="bg-gradient-to-br from-amber-50/95 to-yellow-50/90 w-full max-w-2xl rounded-2xl shadow-2xl shadow-amber-200/30 p-8 backdrop-blur-sm border border-amber-200/50 relative">
        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-amber-300/30 via-yellow-300/40 to-amber-400/30 pointer-events-none"></div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent text-center mb-8 drop-shadow-sm">
          🏝️ Post a Package
        </h2>

        <div  className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Title
            </label>
            <input
              {...register("Title")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">
              {errors.Title?.message}
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              {...register("BasePrice")}
              placeholder="e.g. 250"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">
              {errors.BasePrice?.message}
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Available Slots
            </label>
            <input
              type="number"
              {...register("Slots")}
              placeholder="e.g. 50"
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">
              {errors.Slots?.message}
            </p>
          </div>


{/* Travel Times */}
<div>
  <label className="block text-amber-900 font-semibold mb-2">
    Travel Times
  </label>
  {fields.map((field, index) => (
    <div key={field.id} className="flex items-center gap-2 mb-2">
      <input
        type="time"
        {...register(`TravelTimes.${index}.time`)} // ✅ bind field
        className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200"
      />
      {fields.length>1 && (
      <button
        type="button"
        onClick={() => remove(index)}
        className="bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-3 rounded-lg hover:from-red-500 hover:to-red-600 duration-300 transition shadow-lg"
      >
        ❌
      </button>
      )}
    </div>
  ))}
  <p className="text-red-600 text-sm mt-1 font-medium">
    {errors.TravelTimes?.message || errors.TravelTimes?.[0]?.time?.message}
  </p>
  <button
    type="button"
    onClick={() => append({time:""})}
    className="mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-yellow-600 duration-300 transition shadow-lg font-medium"
  >
    ➕ Add Time
  </button>
</div>

          {/* required */}
                   <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Image Upload (1 is required)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg "
              {...register("Image1")}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image1?.message}</p>
              </div>

              {/* required */}
                   <div>
                      <label className="block text-amber-900 font-semibold mb-2">
              Image Upload (2 is required)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg "
              {...register("Image2")}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image2?.message}</p>
              </div>
              {/* Optional */}
              {AddImages>=1 && (
              <div>
                      <label className="block text-amber-900 font-semibold mb-2">
              Image Upload (3 is optional)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg"
              {...register("Image3")}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image3?.message}</p>
              </div>
              )}
              {AddImages>=2 && (
              <div>
                      <label className="block text-amber-900 font-semibold mb-2">
              Image Upload (4 is optional)
            </label>
            <input
              type="file"
              accept="image/png ,image/jpeg"
              {...register("Image4")}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image4?.message}</p>
              </div>
              )}
              {AddImages>=3 && (
              <div>
                      <label className="block text-amber-900 font-semibold mb-2">
              Image Upload (5 is optional)
            </label>
            <input
              type="file"
              accept=" image/png ,image/jpeg"
              {...register("Image5")}
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.Image5?.message}</p>
              </div>
              )}

              {/* add button */}
              {AddImages<3 && (
              <button    disabled={loading}    onClick={()=>SetAddImages(AddImages+1)}  className={`px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white rounded-lg shadow font-medium  ${loading?" cursor-not-allowed opacity-20":"hover:from-amber-500 hover:to-yellow-500 transition"}`}> ➕ Add More Images</button>
              )}
          {/* Description */}
          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Description
            </label>
            <textarea
              {...register("Description")}
              rows="4"
              placeholder="Write a short description..."
              className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm bg-yellow-50/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 placeholder-amber-600/60 resize-none"
            />
            <p className="text-red-600 text-sm mt-1 font-medium">
              {errors.Description?.message}
            </p>
          </div>

          {/* Submit Button */}
          <button disabled={loading}
          onClick={handleSubmit(handleButton)}
            className={`w-full py-4 mt-6 rounded-xl font-bold shadow-lg text-lg transition-all duration-300  ${loading ? 'cursor-not-allowed opacity-50 bg-amber-300' : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 hover:scale-105 hover:shadow-xl hover:shadow-amber-300/50 text-white'}`}>
            {loading?<Loader/>:"🚀 Post PostPackage"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PostPackage;
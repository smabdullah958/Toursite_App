"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  HideUpdateForm,
  ResetUpdateState,
} from "@/Libraries/ReduxToolkit/Slices/Team/UpdateTeam";
import UpdateTeamThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/UpdateTeam";
//it is used for refetch
import GetTeam from "@/Libraries/ReduxToolkit/AsyncThunck/Team/GetTeam";
//it is used for reset the state of get team
import { resetgetstate } from "@/Libraries/ReduxToolkit/Slices/Team/GetTeam";
import Loader from "@/Components/Loader";

//import validation
import schema from "@/Components/yupValidation/TeamValidation";

const UpdateTeamForm = ({ member }) => {
  const [existingImage, setExistingImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  //UpdateTeamSlice is come from a store
  let { Loading, success } = useSelector((state) => state.UpdateTeamSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  // Watch Img field for preview
  const watchedImage = watch("Img");

  // Prefill form when modal opens
  useEffect(() => {
    if (member) {
      reset({
        Title: member.Title || "",
        Name: member.Name || "",
        Description: member.Description || "",
        Facebook: member.Facebook || "",
        Email: member.Email || "",
        Linkedin: member.Linkedin || "",
      });
      setExistingImage(member.Img); // ✅ store old image
      setPreviewImage(member.Img); // ✅ show old image
    }
  }, [member, reset]);

  // Change preview if new image is selected
  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const file = watchedImage[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [watchedImage]);

  //Handle update button
  let HandleButton = (data) => {
    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Name", data.Name);
    formData.append("Description", data.Description);
    formData.append("Facebook", data.Facebook);
    formData.append("Email", data.Email);
    formData.append("Linkedin", data.Linkedin);

    // If a new image is selected, append it; otherwise, append the existing image URL
    if (data.Img && data.Img[0]) {
      formData.append("Img", data.Img[0]);
    } else if (existingImage) {
      formData.append("ExistingImage", existingImage); // keep old image
    }

    // Dispatch the update thunk with ID and form data
    dispatch(UpdateTeamThunck({ id: member._id, data: formData }));
  };

  useEffect(() => {
    if (success) {
      dispatch(ResetUpdateState()); //this will reset the update state
      dispatch(resetgetstate()); // reset all the state of getTeam
      dispatch(GetTeam()); //again refetch
      dispatch(HideUpdateForm());
    }
  }, [success, dispatch]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="sticky top-0 z-20 text-center rounded-t-2xl">
          {/* Close Button */}
          <button
            onClick={() => dispatch(HideUpdateForm())}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-all duration-200 hover:scale-110"
          >
            ✕
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 p-6 text-center rounded-t-2xl relative">
            <h2 className="text-2xl font-bold text-white">🏝️ Update Team</h2>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div className="grid gap-6">
            {/* Title */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Title
              </label>
              <input
                {...register("Title")}
                placeholder="e.g. Paradise Beach Resort"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">
                {errors.Title?.message}
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Name
              </label>
              <input
                {...register("Name")}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <p className="text-red-500 text-xs mt-1">
                {errors.Name?.message}
              </p>
            </div>
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                📷 {watchedImage && watchedImage[0] ? "New Image Preview" : "Current Image"}
              </label>
              <div className="relative inline-block">
                <img
                  src={previewImage}
                  alt="Team Member Preview"
                  className="w-32 h-32 object-cover rounded-lg border shadow-md"
                />
                {watchedImage && watchedImage[0] && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Upload New Image */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              📸 Upload New Image (Optional)
            </label>
            <input
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              {...register("Img")}
     className="w-full text-sm px-3 py-2 border rounded-lg file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-amber-500 file:text-white hover:file:bg-yellow-700 duration-500 transition-all"         />
            <p className="text-red-500 text-xs mt-1">
              {errors.Img?.message}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Leave empty to keep current image
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              📝 Description
            </label>
            <textarea
              {...register("Description")}
              rows="4"
              placeholder="Describe..."
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.Description?.message}
            </p>
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Facebook
            </label>
            <input
              {...register("Facebook")}
              placeholder="Facebook URL"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.Facebook?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Email
            </label>
            <input
              {...register("Email")}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.Email?.message}
            </p>
          </div>

          {/* Linkedin */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Linkedin
            </label>
            <input
              {...register("Linkedin")}
              placeholder="Linkedin URL"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.Linkedin?.message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(HideUpdateForm())}
    className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200 duration-500 transition-all text-sm"
                >
              ❌ Cancel
            </button>
            <button
              onClick={handleSubmit(HandleButton)}
              disabled={Loading}  
              className={`flex-1 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 ${Loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}
            >
              {Loading ? <Loader /> : "🚀 Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeamForm;

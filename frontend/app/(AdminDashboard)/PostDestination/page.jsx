"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

    const MAX_FILE_SIZE = 300 * 1024 ; // 300kb
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];


// ✅ Validation Schema
const schema = yup.object({
  Title: yup.string().required("Title is required"),
  BasePrice: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  Location: yup.string().required("Location is required"),
  Image: yup.mixed().required("Image is required").test(
                'fileSize',
                'File must be less than 300kb',
                value => value && value.size <= MAX_FILE_SIZE
            )
            .test(
                'fileFormat',
                'Unsupported Format',
                value => value && SUPPORTED_FORMATS.includes(value.type)
            ),
  Description: yup.string().required("Description is required"),
});

const PostDestination = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleButton = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">
          🏝️ Post a Destination
        </h2>

        <div  className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              {...register("Title")}
              placeholder="e.g. Beautiful Beach"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Title?.message}
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              {...register("BasePrice")}
              placeholder="e.g. 250"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.BasePrice?.message}
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              {...register("Location")}
              placeholder="e.g. Maldives"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Location?.message}
            </p>
          </div>
                    <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("Image")}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
            <p className="text-red-500 text-sm mt-1">{errors.Image?.message}</p>
              </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              {...register("Description")}
              rows="4"
              placeholder="Write a short description..."
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.Description?.message}
            </p>
          </div>

          {/* Submit Button */}
          <button
          onClick={handleSubmit(handleButton)}
            
            className="w-full py-3 mt-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all"
          >
            🚀 Post Destination
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDestination;

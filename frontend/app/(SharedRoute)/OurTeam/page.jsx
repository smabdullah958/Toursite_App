"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetAboutThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/GetTeam";
import Image from "next/image";
import DeleteButton from "@/Components/Buttons/Team/TeamDelete";
import UpdateTeamButton from "@/Components/Buttons/Team/UpdateTeam";
import UpdateTeamForm from "@/Components/Form/UpdateTeamForm";
import { Facebook,  Linkedin, Mail } from "lucide-react"; // ✅ icons
import Link from "next/link";
import Loader from "@/app/loading";

const About = () => {
  const dispatch = useDispatch();

  // ✅ here we get the formid from UpdateTeamSlice and also it is used to show a form
  const { FormId } = useSelector((state) => state.UpdateTeamSlice);

  // ✅ read login + role state from CheckLoginSlice
  const { IsLogIn, Role } = useSelector((state) => state.CheckLogInSlice);

  // ✅ getaboutslice is come from a store
  const { result, Loading } = useSelector((state) => state.GetAboutSlice);

  useEffect(() => {
    dispatch(GetAboutThunck());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-blue-100">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Meet Our <span className="text-blue-600">Team</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Dedicated professionals working together to bring the best results.
        </p>
      </div>

      <div className="min-w-screen-xl mx-auto px-6 pb-16">
        {/* No Results State */}
        {result.length === 0 && !Loading && (
          <div className="text-center py-16">
            <div className="text-7xl text-gray-300 mb-6">🏝️</div>
            <h3 className="text-3xl font-bold text-gray-700 mb-2">
              No Team Members Found
            </h3>
            <p className="text-gray-500">
              Please check back later — we’re updating our team.
            </p>
          </div>
        )}

        {/* Team Members Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {result.map((member, i) => (
            <div
              key={`${member._id}-${i}`}
              className="group bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 border border-gray-100"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={member.Img || "/no-image.jpg"}
                  alt={member.Title || "team member"}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card Content */}
              <div className="p-6">
              {/* title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {member.Title || "Team Member"}
                </h3>
                {/* name */}
                <p className="mt-1 text-blue-500 font-medium">{member.Name}</p>
                {/* description */}
                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3 h-10 overflow-y-auto">
                  {member.Description}
                </p>

                {/*  Social + Email Linked in */}
                <div className="mt-4 flex flex-wrap gap-3 items-center">
                  {member.Facebook && (
                    <Link
                      href={`https://www.facebook.com/${member.Facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                    >
                      <Facebook className="w-5 h-5" />
                      <span className="text-sm font-medium">Facebook</span>
                    </Link>
                  )}
                  {member.Linkedin && (
                    <Link
                      href={`https://www.linkedin.com/feed/${member.Linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </Link>
                  )}
                  {member.Email && (
                    <Link
                      href={`https://mail.google.com/mail/u/0/#inbox${member.Email}`}
                      target="_blank"
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm font-medium">{member.Email}</span>
                    </Link>
                  )}
                </div>

                {/* Admin Controls */}
                {IsLogIn && Role === "Admin" && (
                  <div className="flex flex-wrap justify-between mt-6">
                    <DeleteButton id={member._id} />
                    <UpdateTeamButton id={member._id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Show update form in a nice modal */}
        {FormId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => window.location.reload()} // temporary close, replace with redux closeForm
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              {/* Update Form Component */}
              <UpdateTeamForm member={result.find((m) => m._id === FormId)} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {Loading && <Loader/>}
      </div>
    </div>
  );
};

export default About;

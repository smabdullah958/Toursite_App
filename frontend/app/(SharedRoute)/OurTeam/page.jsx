"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetAboutThunck from "@/Libraries/ReduxToolkit/AsyncThunck/Team/GetTeam";
import Image from "next/image";
import DeleteButton from "@/Components/Buttons/Team/TeamDelete";
import UpdateTeamButton from "@/Components/Buttons/Team/UpdateTeam";
import UpdateTeamForm from "@/Components/Form/UpdateTeamForm";
import { Facebook, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Loader from "@/app/loading";

const About = () => {
  const dispatch = useDispatch();

  const { FormId } = useSelector((state) => state.UpdateTeamSlice);
  const { IsLogIn, Role } = useSelector((state) => state.CheckLogInSlice);
  const { result, Loading } = useSelector((state) => state.GetAboutSlice);

  useEffect(() => {
    dispatch(GetAboutThunck());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Meet Our <span className="bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-600 bg-clip-text text-transparent">Professional Team</span>
        </h1>
        <p className="text-amber-700 text-sm sm:text-lg max-w-2xl mx-auto">
          Experienced travel professionals dedicated to creating unforgettable journeys for our valued clients.
        </p>
      </div>

      <div className="max-w-screen mx-auto px-6 pb-16">
        {/* No Results State */}
        {result.length === 0 && !Loading && (
          <div className="text-center py-16">
            <div className="text-7xl text-amber-300 mb-6">👥</div>
            <h3 className="text-3xl font-bold text-amber-800 mb-2">
              No Team Members Found
            </h3>
            <p className="text-amber-600">
              Please check back later — we're updating our team information.
            </p>
          </div>
        )}

        {/* Team Members Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {result.map((member, i) => (
            <div
              key={`${member._id}-${i}`}
              className="group bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 border border-amber-200"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  loading="lazy"
                  src={member.Img || "/no-image.jpg"}
                  alt={member.Title || "team member"}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* title */}
                <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
                  {member.Title || "Team Member"}
                </h3>
                {/* name */}
                <p className="mt-1 text-amber-600 font-semibold text-lg">{member.Name}</p>
                {/* description */}
                <p className="mt-3 text-sm text-amber-800 leading-relaxed line-clamp-3 h-16 overflow-y-auto">
                  {member.Description}
                </p>

                {/* Social + Email Links */}
                <div className="mt-6 flex flex-wrap gap-3 items-center">
                  {member.Facebook && (
                    <Link
                      href={`https://www.facebook.com/${member.Facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-amber-700 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Facebook className="w-4 h-4" />
                      <span className="text-xs font-medium">Facebook</span>
                    </Link>
                  )}
                  {member.Linkedin && (
                    <Link
                      href={`https://www.linkedin.com/feed/${member.Linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-yellow-700 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-xs font-medium">LinkedIn</span>
                    </Link>
                  )}
                  {member.Email && (
                    <Link
                      href={`mailto:${member.Email}`}
                      className="flex items-center gap-2 bg-amber-800 text-white px-3 py-2 rounded-lg hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-medium">Email</span>
                    </Link>
                  )}
                </div>

                {/* Admin Controls */}
                {IsLogIn && Role === "Admin" && (
                  <div className="flex flex-wrap gap-2 justify-between mt-6 pt-4 border-t border-amber-200">
                    <DeleteButton id={member._id} />
                    <UpdateTeamButton id={member._id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Update Form Modal */}
        {FormId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-amber-200">
              {/* Close Button */}
              <button
                onClick={() => window.location.reload()}
                className="absolute top-4 right-4 text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              {/* Update Form Component */}
              <div className="pt-4">
                <UpdateTeamForm member={result.find((m) => m._id === FormId)} />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {Loading && <Loader />}
      </div>
    </div>
  );
};

export default About;
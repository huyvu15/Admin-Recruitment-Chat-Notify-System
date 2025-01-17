import React from "react";
import { Link } from "react-router-dom";
import robot_img from "../assets/robot_image.png";

function HomePage({ user }) {
  return (
    <div className="relative min-h-[85vh] w-full overflow-hidden bg-gradient-to-r from-teal-100 via-blue-100 to-purple-100">
      {/* Animated background elements */}
      <div className="absolute top-20 -left-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
      <div className="absolute top-20 -right-10 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-1000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob delay-2000" />

      <div className="relative flex items-center justify-center min-h-[85vh] px-4">
        <div className="max-w-4xl text-center">
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition duration-500 blur-sm"></div>
              <img
                className="relative block w-[160px] h-[160px] md:w-[180px] md:h-[180px] rounded-full border-2 border-white shadow-lg transform transition duration-500 hover:scale-105"
                src={user?.picture ? `${user.picture.replace("=s96-c", "")}?sz=500` : "https://via.placeholder.com/200"}
                alt="User Avatar"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-700 animate-pulse">+</div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full opacity-60 group-hover:opacity-100 transition duration-500 blur-sm"></div>
              <img
                className="relative block w-[160px] h-[160px] md:w-[180px] md:h-[180px] rounded-full border-2 border-white shadow-lg transform transition duration-500 hover:scale-105"
                src={robot_img}
                alt="Robot Avatar"
              />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-tight">
              Xin chào, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{user?.name || "bạn"}!</span>
            </h1>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600">
              GluTis Chatbot
            </h2>

            <p className="py-4 font-medium text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Giúp bạn giải đáp thắc mắc, tra cứu thông tin một cách nhanh chóng và chính xác nhất!
            </p>

            {/* Start Button */}
            <Link to="/chat">
              <button
                className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group hover:ring-2 hover:ring-offset-2 hover:ring-blue-500"
              >
                <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-full group-hover:mt-0 group-hover:ml-0"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                <span className="relative text-lg">Bắt đầu ngay</span>
                <svg
                  className="relative w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
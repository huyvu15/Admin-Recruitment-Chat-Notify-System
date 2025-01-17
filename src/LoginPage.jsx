// import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import React from "react";



const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-xy">
        <div className="absolute inset-0 bg-grid-slate-200 opacity-20" />
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="relative w-full max-w-md px-8 py-12 mx-4">
        {/* Glass card */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50" />
        
        {/* Content */}
        <div className="relative space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-gray-600 text-base">
              Đăng nhập để tiếp tục sử dụng dịch vụ
            </p>
          </div>

          {/* Ornamental line */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-30" />
          </div>

          {/* Login section */}
          <div className="space-y-6">
            <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
            
            <button
              onClick={() => alert("Chức năng gửi góp ý đang phát triển!")}
              className="w-full px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Gửi góp ý ẩn danh tới BOD
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Góp ý sẽ được bảo mật hoàn toàn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



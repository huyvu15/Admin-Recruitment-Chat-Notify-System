import React, { useEffect } from "react";

const GoogleLoginButton = ({ onLoginSuccess }) => {
  useEffect(() => {
    /* Initialize Google Sign-In */
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    /* Render the Google Sign-In button */
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "Large" } // Customize button
    );
  }, []);

  const handleCredentialResponse = (response) => {
    const token = response.credential;
    console.log("Token ID:", token);

    // Decode token to get user information (optional)
    const userInfo = parseJwt(token);
    console.log("User Info:", userInfo);

    if (onLoginSuccess) {
      onLoginSuccess(userInfo);
    }
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  return <div id="googleSignInDiv"></div>;
};

export default GoogleLoginButton;

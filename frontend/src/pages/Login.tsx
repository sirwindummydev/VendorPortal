import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { Row, Col } from "antd";
// import companylogo from "../utils/assets/iams_logo3.3.png";
import companylogo from "../assets/sidebar_transparent.png";

function Login() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blurry abstract SVG background */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <ellipse
          cx="300"
          cy="200"
          rx="320"
          ry="180"
          fill="#fa8c16"
          opacity="0.18"
          filter="url(#blur1)"
        />
        <ellipse
          cx="1200"
          cy="700"
          rx="320"
          ry="180"
          fill="#002766"
          opacity="0.12"
          filter="url(#blur2)"
        />
        <defs>
          <filter
            id="blur1"
            x="-100"
            y="-100"
            width="800"
            height="600"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="80" />
          </filter>
          <filter
            id="blur2"
            x="800"
            y="400"
            width="800"
            height="600"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="80" />
          </filter>
        </defs>
      </svg>
      {/* Single card layout with logo above login */}
      <div
        style={{
          width: "100%",
          maxWidth: 300,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          position: "relative",
          zIndex: 1,
          padding: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={companylogo}
          alt="Company Logo"
          style={{
            maxWidth: 220,
            width: "70%",
            height: "auto",
            marginBottom: 0,
          }}
        />
        <LoginForm />
      </div>
    </div>
  );
}
export default Login;

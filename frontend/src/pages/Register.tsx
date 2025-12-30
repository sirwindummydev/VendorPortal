import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { Row, Col, Divider } from "antd";
// import companylogo from "../utils/assets/iams_logo3.3.png";
import companylogo from "../assets/sidebar_transparent.png";

const Register = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row
        gutter={48}
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        <Col
          xs={24}
          md={11}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 5px",
          }}
        >
          <img
            src={companylogo} // Change to your company logo path
            alt="Company Logo"
            style={{ maxWidth: 620, width: "100%", height: "auto" }}
          />
        </Col>
        <Divider
          orientation="vertical"
          style={{ height: "400px", display: "flex", alignSelf: "center" }}
        />
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 50,
          }}
        >
          <RegisterForm />
        </Col>
      </Row>
    </div>
  );
};

export default Register;

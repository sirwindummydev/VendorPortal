import React from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  Space,
  Typography,
  notification,
} from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

function RegisterForm() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  // handle the state of the terms and conditions checkbox
  const [agreed, setAgreed] = React.useState(false);

  const onFinish = async (values: any) => {
    try {
      console.log("Success:", values);
      const response = await register(values);
      api.success({
        title: "Registration Successful",
        description: "You have successfully registered.",
      });
      form.resetFields();
      console.log("Registration successful:", response);
      setTimeout(() => {
        navigate("/login");
      }, 1000); // Wait 1 second before redirecting
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      {contextHolder}
      {
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ width: "100%", textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                fontWeight: 700,
                color: "#002766",
                fontSize: 22,
                marginBottom: 4,
              }}
            >
              Sign Up
            </div>
            <div style={{ color: "#888", fontSize: 14, fontWeight: 400 }}>
              Create an account with vendoros
            </div>
          </div>
          <Form
            form={form}
            name="register"
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            style={{ width: "100%" }}
          >
            <Form.Item
              label={
                <span>
                  First Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="first_name"
              rules={[
                { required: true, message: "Please input your First Name!" },
              ]}
            >
              <Input
                placeholder="First Name"
                type={"text"}
                suffix={<UserOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Last Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="last_name"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input
                placeholder="Last Name"
                type={"text"}
                suffix={<UserOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Email <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                placeholder="Email"
                type={"text"}
                suffix={<MailOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  Username <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                placeholder="Username"
                type={"text"}
                suffix={<UserOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>
            {/* <Form.Item
          label={
            <span>
              Email <span style={{ color: "red" }}>*</span>
            </span>
          }
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            placeholder="Email"
            type={"email"}
            suffix={<MailOutlined style={{ opacity: 0.5 }} />}
          />
        </Form.Item> */}
            <Form.Item
              label={
                <span>
                  Password <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="password"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%", marginBottom: 5 }}>
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ fontSize: 12 }}
                >
                  I agree to the
                </Checkbox>
                <Typography.Link
                  href="/terms"
                  target="_blank"
                  style={{ fontSize: 12, color: "#002766" }}
                >
                  Terms & Conditions
                </Typography.Link>
              </Space>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  background: !agreed ? "#f1daac96" : "#fa8c16",
                  borderColor: !agreed ? "#f1daac96" : "#fa8c16",
                  color: !agreed ? "#e07a0da8" : "#fff",
                }}
                loading={false} // Manage loading state here
                disabled={!agreed} // Disable button if terms not agreed
              >
                Create Account
              </Button>
            </Form.Item>
            <Space>
              <Typography.Text style={{ fontSize: 12 }}>
                Already have an account ?
              </Typography.Text>
              <Button
                type="link"
                style={{ fontSize: 12, padding: 0, color: "#002766" }}
              >
                <Link to="/login" style={{ color: "#002766" }}>
                  Sign In Instead
                </Link>
              </Button>
            </Space>
          </Form>
        </div>
      }
    </>
  );
}

export default RegisterForm;

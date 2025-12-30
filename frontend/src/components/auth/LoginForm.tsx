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
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
// import url from "../../utils/assets/iams_logo2.4.png";

function LoginForm() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const data = await login(values);
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      // Set flag for dashboard notification
      localStorage.setItem("showWelcome", "true");
      navigate("/dashboard");
      form.resetFields();
    } catch (error: any) {
      api.error({
        title: "Login Failed",
        description:
          error?.response?.data?.non_field_errors?.[0] ||
          "Invalid credentials.",
      });
    } finally {
      setLoading(false);
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
          {/* <div style={{ width: "100%", textAlign: "center", marginBottom: 24 }}>
        <div
          style={{
            fontWeight: 700,
            color: "#002766",
            fontSize: 22,
            marginBottom: 4,
          }}
        >
          Sign In
        </div>
        <div style={{ color: "#888", fontSize: 14, fontWeight: 400 }}>
          Login to your iams account
        </div>
      </div> */}
          <Form
            form={form}
            name="login"
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            style={{ width: "100%", maxWidth: 400 }}
          >
            <Form.Item
              label={
                <span>
                  Username <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                suffix={<UserOutlined style={{ opacity: 0.5 }} />}
              />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Password <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                <Checkbox style={{ fontSize: 12 }}>Remember me</Checkbox>
                <Button type="link" style={{ padding: 0, color: "#fa8c16" }}>
                  Forgot password?
                </Button>
              </Space>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  background: "#fa8c16",
                  borderColor: "#fa8c16",
                }}
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </Form.Item>
            <Space>
              <Typography.Text style={{ fontSize: 12 }}>
                No account yet?
              </Typography.Text>
              <Button
                type="link"
                style={{ fontSize: 12, padding: 0, color: "#fa8c16" }}
              >
                <Link to="/register" style={{ color: "#fa8c16" }}>
                  Create an account
                </Link>
              </Button>
            </Space>
          </Form>
        </div>
      }
    </>
  );
}

export default LoginForm;

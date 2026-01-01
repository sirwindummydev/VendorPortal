import React from "react";
import Modal from "antd/es/modal/Modal";
import { Avatar, Button, Divider, Form, Input, Space, Typography } from "antd";
// import { addTenant } from "../../../api/tenants";
import { notification } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import ActionButton from "../../common/ActionButton";
import { UserOutlined } from "@ant-design/icons";
import imageUrl from "../../../assets/default.jpg";
import { createTenant } from "../../../api/tenants";

interface AddTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface TenantFormValues {
  tenant_name: string;
  description: string;
  email: string;
  phone_number: string;
  subdomain: string;
}
const AddTenantModal = (props: AddTenantModalProps) => {
  const { isOpen, onClose } = props;
  const [form] = Form.useForm();
  let notificationInstance: NotificationInstance;
  const [api, contextHolder] = notification.useNotification();
  const handleAddTenant = async () => {
    try {
      const values: TenantFormValues = await form.validateFields();
      await createTenant(values);
      console.log("Form Values:", values);
      api.success({
        title: "Tenant Added",
        description: "The tenant has been added successfully.",
      });
      form.resetFields();
      onClose();
      // onTenantAdded(newTenant);
    } catch (error) {
      api.error({
        title: "Error",
        description: "There was an error adding the tenant.",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <>
            Add New Tenant
            <Divider style={{ margin: "8px 0" }} />
          </>
        }
        open={isOpen}
        onCancel={onClose}
        footer={[
          <ActionButton
            key="cancel"
            label="Cancel"
            onClick={onClose}
            token="contrast"
          />,
          <ActionButton
            key="add"
            label="Add Tenant"
            onClick={handleAddTenant}
            token="primary"
          />,
        ]}
      >
        <Space
          align="start"
          size="large"
          style={{
            backgroundColor: "#e2e2e286",
            width: "100%",
            borderRadius: 4,
            marginBottom: 24,
          }}
        >
          <Avatar
            size={64}
            src={imageUrl}
            icon={!imageUrl && <UserOutlined />}
            style={{
              //   backgroundColor: "#fa8c16",
              outline: "2px dotted #d9d9d9",
              margin: 8,
            }}
          />
          <Space
            orientation="vertical"
            size={4}
            style={{ marginTop: 10, padding: "8px 0 0" }}
          >
            <Typography.Text strong>Upload Profile Image</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              The image should be at least 4MB
            </Typography.Text>
            {/* <Space size="middle" style={{ marginTop: 2 }}>
              <ActionButton label="Upload" token="primary" onClick={() => {}} />
              <ActionButton
                label="Cancel"
                token="contrast"
                onClick={() => {}}
              />
            </Space> */}
          </Space>
        </Space>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tenant Name"
            name="tenant_name"
            rules={[
              { required: true, message: "Please enter the tenant name" },
            ]}
          >
            <Input placeholder="Enter tenant name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            label="Subdomain / Account URL"
            name="subdomain"
            rules={[{ required: true, message: "Please enter the subdomain" }]}
          >
            <Input placeholder="Enter subdomain" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddTenantModal;

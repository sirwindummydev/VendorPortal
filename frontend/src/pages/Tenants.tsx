import React from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import SectionHeader from "../components/common/SectionHeader";
import ActionButton from "../components/common/ActionButton";
import SectionTable from "../components/common/SectionTable";
import type { ColumnsType } from "antd/es/table";

import { useState, type ReactNode } from "react";
import { ImportOutlined } from "@ant-design/icons";
import AddTenantModal from "../components/layouts/modals/AddTenantModal";

interface AllTenantsProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  token?: string;
  domainId?: string;
  domainName?: string;
  description?: string;
  createdAt?: string;
  createdBy?: string;
  tableComponent?: ReactNode;
}

const AllTenants = (props: AllTenantsProps) => {
  const { title = "All Tenants", subtitle = "List of all tenants" } = props;
  //   const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTenant = () => {
    // Logic to open Add Tenant Modal
    setIsModalOpen(true);
  };

  //   const handleOpenModal = () => {
  //     // Logic to open Add Tenant Modal
  //     setIsAddTenantModalOpen(true);
  //   };

  const columns: ColumnsType<AllTenantsProps> = [
    {
      title: "Tenant ID",
      dataIndex: "tenantId",
      key: "tenantId",
    },
    {
      title: "Tenant Name",
      dataIndex: "tenantName",
      key: "tenantName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Account URL",
      dataIndex: "accountUrl",
      key: "accountUrl",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Created At",
      dataIndex: "CreatedAt",
      key: "createdAt",
    },
    { title: "Created By", dataIndex: "createdBy", key: "createdBy" },
    { title: "Action", dataIndex: "action", key: "action" },
  ];

  return (
    <>
      <Space orientation="vertical" size="large" style={{ width: "100%" }}>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          token="primary"
          actions={[
            <ActionButton
              key="add-tenant"
              label="Add New Tenant"
              icon="+"
              token="primary"
              onClick={handleAddTenant}
            />,
            // <ActionButton
            //   key="import-tenant"
            //   label="Import Tenant"
            //   icon={<ImportOutlined />}
            //   token="contrast"
            // />,
          ]}
        />

        <SectionTable columns={columns} />
      </Space>
      <AddTenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AllTenants;

import React from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import SectionHeader from "../components/common/SectionHeader";
import ActionButton from "../components/common/ActionButton";
import SectionTable from "../components/common/SectionTable";
import type { ColumnsType } from "antd/es/table";

import { useState, useEffect, type ReactNode } from "react";
import { ImportOutlined } from "@ant-design/icons";
import AddTenantModal from "../components/layouts/modals/AddTenantModal";
import { getTenantDetails, getTenants } from "../api/tenants";

interface AllTenantsProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  token?: string;
  id?: string;
  domainName?: string;
  description?: string;
  createdAt?: string;
  createdBy?: string;
  tableComponent?: ReactNode;
  dataSource?: any[];
}

const AllTenants = (props: AllTenantsProps) => {
  const { title = "All Tenants", subtitle = "List of all tenants" } = props;
  //   const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenants, setTenants] = useState([]);

  const handleAddTenant = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants();
        setTenants(data);
      } catch (error) {
        console.error("Error fetching tenants:", error);
      }
    };
    fetchTenants();
  }, []);

  const columns: ColumnsType<AllTenantsProps> = [
    {
      title: "Tenant ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tenant Name",
      dataIndex: "tenant_name",
      key: "tenant_name",
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
      dataIndex: "account_url",
      key: "account_url",
    },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        });
      },
    },
    // { title: "Created By", dataIndex: "created_by", key: "created_by" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
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

        <SectionTable columns={columns} dataSource={tenants} />
      </Space>
      <AddTenantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AllTenants;

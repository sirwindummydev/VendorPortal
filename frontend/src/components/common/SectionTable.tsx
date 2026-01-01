import { Table } from "antd";
import React from "react";
import type { ReactNode } from "react";

interface SectionTableProps {
  extra?: ReactNode;
  tableComponent?: ReactNode;
  columns?: any;
}
const SectionTable = (props: SectionTableProps) => {
  const { extra, tableComponent, columns } = props;

  return (
    <>
      <Table columns={columns}>{tableComponent}</Table>
    </>
  );
};
export default SectionTable;

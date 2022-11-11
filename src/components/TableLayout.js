import { ReactiveList } from "@appbaseio/reactivesearch";
import { Table } from "antd";
import React from "react";

const TableLayout = ({ searchHits, isLoading }) => {
  const columns = [
    {
      title: "Member",
      dataIndex: "Member",
      key: "Member",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Service",
      dataIndex: "Service",
      key: "Service",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={searchHits} />
    </div>
  );
};

export default TableLayout;

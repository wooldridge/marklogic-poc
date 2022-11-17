import { Table } from "antd";
import React from "react";

const TableLayout = ({ searchHits, isLoading, hitsCount }) => {
  const columns = [
    {
      title: "Member",
      dataIndex: "Member.Member.LastName",
      key: "member",
    },
    {
      title: "Provider",
      dataIndex: "CMSProvider.CMSProvider.ProviderLastName",
      key: "provider",
    },
    {
      title: "Type",
      dataIndex: "ClaimFHIR.ClaimFHIR.type",
      key: "type",
    },
    {
      title: "Service",
      dataIndex: "ClaimItem.ClaimItem.serviceDescription",
      key: "service",
    },
    {
      title: "Price",
      dataIndex: "ClaimItem.ClaimItem.unitPrice",
      key: "price",
    },
    {
      title: "Diagnosis",
      dataIndex: "ClaimFHIR.ClaimFHIR.diagnosisIRI",
      key: "diagnosis",
    },
  ];

  return (
    <div>
      {hitsCount ? (
        <div style={{ marginBottom: "10px" }}>{hitsCount} results found!</div>
      ) : null}
      <Table
        columns={columns}
        dataSource={searchHits}
        loading={isLoading}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default TableLayout;

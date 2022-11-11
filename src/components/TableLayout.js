import { ReactiveList } from "@appbaseio/reactivesearch";
import { Table } from "antd";
import React from "react";

const TableLayout = () => {
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
      <ReactiveList
        // dataField={["description", "label"]}
        componentId="result"
        react={{
          and: ["term", "search"],
        }}
        render={({ loading, error, data }) => {
          if (loading) {
            return <div>Fetching Results.</div>;
          }
          if (error) {
            return (
              <div>
                Something went wrong! Error details {JSON.stringify(error)}
              </div>
            );
          }
          return <Table columns={columns} dataSource={data} />;
        }}
      />
    </div>
  );
};

export default TableLayout;

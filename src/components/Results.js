import { ReactiveList } from "@appbaseio/reactivesearch";
import { List } from "antd";
import React from "react";

const Results = ({ searchHits, isLoading }) => {
  console.log(searchHits);
  return (
    <div style={{ width: "80%" }}>
      <List
        bordered
        dataSource={searchHits}
        pagination={{ defaultPageSize: 5 }}
        loading={isLoading}
        renderItem={(res) => (
          <List.Item style={{ textAlign: "left" }}>
            <List.Item.Meta
              title={
                <b style={{ fontSize: 16 }}>
                  {res.FullName || res.PrimarySpeciality}
                </b>
              }
              description={
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {(res.origAddress1 || res.Addressline1) && (
                    <div>Address: {res.origAddress1 || res.Addressline1}</div>
                  )}
                  {res.Gender && <div>Gender: {res.Gender}</div>}
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default Results;

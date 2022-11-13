import { List } from "antd";
import React from "react";

const SparqlResults = ({ searchHits, isLoading }) => {
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
              title={<b style={{ fontSize: 16 }}>{res.Disease}</b>}
              description={
                <div>
                  {res.Description && (
                    <div style={{ marginBottom: 15 }}>
                      Description: {res.Description}
                    </div>
                  )}
                  {res.Parent && (
                    <div style={{ marginBottom: 15 }}>Parent: {res.Parent}</div>
                  )}
                  {res.Children && (
                    <div style={{ marginBottom: 15 }}>
                      Children: {res.Children}
                    </div>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default SparqlResults;

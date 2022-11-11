import { ReactiveList } from "@appbaseio/reactivesearch";
import { List } from "antd";
import React from "react";

const Results = () => {
  return (
    <div>
      <ReactiveList
        dataField={["description", "label"]}
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
          return (
            <List
              bordered
              dataSource={data}
              renderItem={(res) => (
                <List.Item style={{ textAlign: "left" }}>
                  <List.Item.Meta
                    title={<b style={{ fontSize: 16 }}>{res.Disease}</b>}
                    description={res.Description}
                  />
                </List.Item>
              )}
            ></List>
          );
        }}
      />
    </div>
  );
};

export default Results;

import { List } from "antd";
import React from "react";

const SearchResults = ({ searchHits, isLoading }) => {
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
                  {(res.FullAddress || res.Addressline1) && (
                    <div className="description-sub-items-1">
                      Address: {res.FullAddress || res.Addressline1}
                    </div>
                  )}
                  {res.Race && (
                    <div className="description-sub-items-1">
                      Race: {res.Race}
                    </div>
                  )}

                  <div className="description-sub-items-2">
                    {res.Gender && <>Gender: {res.Gender}</>}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default SearchResults;

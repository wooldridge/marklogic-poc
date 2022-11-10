import { SearchBox } from "@appbaseio/reactivesearch";
import { Select } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";

const Search = () => {
  const [value, setValue] = useState("All");

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Select
        style={{ width: 220 }}
        allowClear
        size="large"
        value={value}
        onChange={(val) => setValue(val)}
        options={[
          {
            value: "All",
            label: "All",
          },
          {
            value: "Member",
            label: "Member",
          },
          {
            value: "ServiceLocation",
            label: "ServiceLocation",
          },
        ]}
      ></Select>
      <SearchBox
        componentId="search"
        enterButton
        style={{ width: "75%" }}
        // autosuggest={false}
      />
    </div>
  );
};

export default Search;

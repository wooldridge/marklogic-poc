import React from "react";
import { SearchBox } from "@appbaseio/reactivesearch";
import { Select } from "antd";
import "antd/dist/antd.css";

const Search = () => {
  return (
    <SearchBox
      dataField={["description", "label"]}
      componentId="search"
      enterButton
      style={{ width: "75%" }}
      // autosuggest={false}
    />
  );
};

export default Search;

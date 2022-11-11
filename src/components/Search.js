import React, { useState } from "react";
import { SearchBox } from "@appbaseio/reactivesearch";
import { Button, Input, Select } from "antd";
import "antd/dist/antd.css";

const Search = ({ setInputVal }) => {
  const [val, setVal] = useState("");

  return (
    <div style={{ display: "flex", width: "80%", gap: 20 }}>
      <Input value={val} onChange={(e) => setVal(e.target.value)} />
      <Button onClick={() => setInputVal(val)} type="primary" size="large">
        Search
      </Button>
    </div>
  );
};

export default Search;

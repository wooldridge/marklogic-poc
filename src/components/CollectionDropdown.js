import { Select } from "antd";
import React from "react";

const CollectionDropdown = ({ mlCollection, setMlCollection }) => {
  return (
    <Select
      style={{ width: "18%", minWidth: 220 }}
      allowClear
      size="large"
      value={mlCollection}
      onChange={(val) => setMlCollection(val)}
      options={[
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
  );
};

export default CollectionDropdown;

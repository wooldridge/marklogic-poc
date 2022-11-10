import { ReactiveBase } from "@appbaseio/reactivesearch";
import React from "react";

const Wrapper = () => {
  return (
    <ReactiveBase
      app="_marklogic"
      url="https://sls-marklogic-mhtrceb-arc.searchbase.io"
      credentials={btoa("2vhVRi0Oxf:ADyzknt5fY5FLmWcVK")}
      enableAppbase
    >
      sample
    </ReactiveBase>
  );
};

export default Wrapper;

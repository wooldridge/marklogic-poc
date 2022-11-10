import { MultiList } from "@appbaseio/reactivesearch";
import React from "react";

const Facet = () => {
  return <MultiList componentId="term" dataField="Member.Race" title="" />;
};

export default Facet;

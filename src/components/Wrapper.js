import { ReactiveBase, SelectedFilters } from "@appbaseio/reactivesearch";
import React from "react";
import Facet from "./Facet";
import Results from "./Results";
import Search from "./Search";

const Wrapper = () => {
  return (
    <ReactiveBase
      app="_marklogic"
      url="https://sls-marklogic-mhtrceb-arc.searchbase.io"
      credentials="2vhVRi0Oxf:ADyzknt5fY5FLmWcVK"
      enableAppbase
      transformRequest={(props) => {
        const newBody = JSON.parse(
          // eslint-disable-next-line
          props.body
        );
        const newQuery = newBody.query.map((ele) => {
          if (ele.id === "search" && ele.type === "suggestion") {
            const newEle = { ...ele };
            delete newEle.type;
            return newEle;
          }
          return ele;
        });
        newBody.query = newQuery;
        // eslint-disable-next-line
        props.body = JSON.stringify(newBody);

        return props;
      }}
    >
      <div
        style={{
          padding: 30,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Search />
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ width: 220 }}>
            <Facet />
          </div>
          <SelectedFilters />
          <Results />
        </div>
      </div>
    </ReactiveBase>
  );
};

export default Wrapper;

import { ReactiveList } from "@appbaseio/reactivesearch";
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
        renderItem={(res) => {
          console.log(res);
          return <div>{res.title}</div>;
        }}
      />
    </div>
  );
};

export default Results;

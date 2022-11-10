import { ReactiveBase, SelectedFilters } from "@appbaseio/reactivesearch";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Facet from "./Facet";
import Results from "./Results";
import Search from "./Search";

const Wrapper = () => {
  const [mlMode, setMlMode] = useState("search");
  const [queryParams, setQueryParams] = useState("");
  const [mlCollection, setMlCollection] = useState("All");
  const [url, setUrl] = useState(
    "https://sls-marklogic-mhtrceb-arc.searchbase.io"
  );

  useEffect(() => {
    setUrl(getURL());
  }, [queryParams]);

  const handleTabChange = (key) => {
    setMlMode(key);
    let newStr = "";
    if (queryParams) {
      newStr = `${queryParams}&ml__mode=${key}`;
    } else {
      newStr = `ml__mode=${key}`;
    }
    setQueryParams(newStr);
  };

  const handleMlCollection = (key) => {
    setMlCollection(key);
    let newStr = "";
    if (queryParams) {
      newStr = `${queryParams}&ml__collection=${key}`;
    } else {
      newStr = `ml__collection=${key}`;
    }
    setQueryParams(newStr);
  };

  const getURL = () => {
    let str = "https://sls-marklogic-mhtrceb-arc.searchbase.io";
    if (queryParams) return `${str}?${queryParams}`;

    return str;
  };

  console.log(url, queryParams);
  return (
    <ReactiveBase
      app="_marklogic"
      url={url}
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
        <Tabs
          defaultActiveKey="search"
          activeKey={mlMode}
          onChange={handleTabChange}
        >
          <Tabs.TabPane tab="/vi1/Search" key="search">
            <div style={{ padding: 20 }}>
              <Search
                mlCollection={mlCollection}
                setMlCollection={handleMlCollection}
              />
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ width: 220 }}>
                  <Facet />
                </div>
                <SelectedFilters />
                <Results />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="SPARQL" key="sparql">
            SPARQL tab
          </Tabs.TabPane>
          <Tabs.TabPane tab="Optic" key="optic">
            Optic tab
          </Tabs.TabPane>
        </Tabs>
      </div>
    </ReactiveBase>
  );
};

export default Wrapper;

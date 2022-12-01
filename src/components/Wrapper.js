import { ReactiveBase, ReactiveComponent } from "@appbaseio/reactivesearch";
import { Tabs } from "antd";
import get from "lodash.get";
import React, { useEffect, useState } from "react";
import CollectionDropdown from "./CollectionDropdown";
import Facet from "./Facet";
import SearchResults from "./SearchResults";
import Search from "./Search";
import TableLayout from "./TableLayout";
import SparqlResults from "./SparqlResults";

import "bootstrap/dist/css/bootstrap.min.css";
import { SearchBox, ResultsList } from 'maftest-button';
import searchConfig from '../config/search.config.js';
import { Chart } from 'regraph';

const Wrapper = () => {
  const [mlMode, setMlMode] = useState("search");
  const [mlCollection, setMlCollection] = useState("Member");
  const [inputVal, setInputVal] = useState("");
  const [searchHits, setSearchHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hitsCount, setHitsCount] = useState(0);
  const [searchResponse, setSearchResponse] = useState({});
  const [items, setItems] = useState({});

  useEffect(() => {
    handleTabChange(mlMode);
  }, []);

const labelStyle = {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'rgb(202, 209, 216)',
    center: false,
};

const linkStyle = {
    color: 'rgb(221, 60, 60)',
    width: 4,
};

// Build ReGraph network graph
useEffect(() => {
    if (mlMode === 'regraph') {
        const newItems = {};
        // For each disease result, create graph of parent and children relations
        searchHits.forEach((h, i) => {
            newItems['disease'+i] = {
                color: 'rgb(241, 93, 91)',
                label: {text: h.Disease.substring(0, 16)+'...'},
                size: 2.5,
            }
            if (h.Parent) {
                newItems['parent'+i] = {
                    color: 'rgb(4, 129, 112)',
                    label: {text: h.Parent.substring(0, 16)+'...'},
                    size: 1.5,
                };
                newItems['linkParent'+i] = {
                    ...linkStyle,
                    id1: 'disease'+i,
                    id2: 'parent'+i,
                    label: {text: 'hasParent'},
                }
            }
            if (h.Children) {
                newItems['child'+i] = {
                    color: 'rgb(4, 129, 112)',
                    label: {text: h.Children.substring(0, 16)+'...'},
                    size: 1.7,
                };
                newItems['linkChild'+i] = {
                    ...linkStyle,
                    id1: 'disease'+i,
                    id2: 'child'+i,
                    label: {text: 'hasChild'},
                }
            }
        })
        setItems(newItems);
    }
}, [searchHits]);

  const settings = {
    options: {
      navigation: false,
      overview: false,
      backgroundColor: 'rgb(61, 72, 82)',
    },
    onWheel: ({ preventDefault }) => {
      preventDefault();
    },
  };

  const handleTabChange = (key) => {
    console.log("handleTabChange key", key);
    setInputVal("");
    setMlCollection("Member");
    setSearchResponse({});
    setMlMode(key);
  };

  const handleMlCollection = (key) => {
    console.log("handleMlCollection key", key);
    setMlCollection(key);
  };

  const ML_URL = "https://test-sls-instance-wjictry-arc.searchbase.io";
  const ML_CREDS = "e901c566e571:f5a72c51-193b-4cc5-bad1-0a308339cf2f";

  const getURL = () => {
    let str =
      `${ML_URL}/_marklogic/_reactivesearch`;
    let query = "";
    // Handle 'ev' tab search as 'search' tab searches
    const mlModeNew = (mlMode === 'search' || mlMode === 'ev') ? 'search' : mlMode; 
    if (mlCollection && mlMode) {
      query += `ml__collection=${mlCollection}&ml__mode=${mlModeNew}`;
    } else if (mlMode || mlCollection) {
      if (mlMode) query += `ml__mode=${mlModeNew}`;
      if (mlCollection) query += `ml__collection=${mlCollection}`;
    }
    if (query) return `${str}?${query}`;

    return str;
  };

  return (
    <div key={`${mlMode}-${mlCollection}-${inputVal}`}>
      <ReactiveBase
        app="_marklogic"
        url={ML_URL}
        credentials={ML_CREDS}
        enableAppbase
        transformRequest={(props) => {
          setIsLoading(true);
          const newBody = JSON.parse(props.body);
          const termQuery = newBody.query.filter(
            (i) => i.type === "term" && i.id === "term"
          );

          const newQuery = [
            ...( (mlMode === "search" || mlMode === "ev") ? newBody.query : []),
            {
              id: "search",
              value: inputVal,
              execute: true,
              ...(termQuery && termQuery[0] && termQuery[0].value
                ? { react: { and: ["term"] } }
                : {}),
            },
          ];
          newBody.query = newQuery;
          props.body = JSON.stringify(newBody);
          if (mlMode === "search" || mlMode === "ev") props.url = getURL();
          else {
            let str =
              `${ML_URL}/_marklogic/_reactivesearch`;
            // Handle 'regraph' tab search as 'sparql' tab searches
            const mlModeNew = (mlMode === 'sparql' || mlMode === 'regraph') ? 'sparql' : mlMode; 
            props.url = `${str}?ml__mode=${mlModeNew}`;
          }

          return props;
        }}
        transformResponse={async (elasticsearchResponse, componentId) => {
          if (componentId === "search") {
            // TODO 'ev' searches to pull content from elasticsearchResponse payload
            setSearchResponse(elasticsearchResponse);
            const hits = elasticsearchResponse?.hits?.hits || [];
            const totHitsCount = elasticsearchResponse?.hits?.total?.value || 0;
            setHitsCount(totHitsCount);
            const newHits = hits.map((hit) => {
              if (mlMode === "search") {
                const content = get(hit, "_source.extracted.content", [{}]);
                const contentObj = content[0];
                if (contentObj && Object.values(contentObj).length) {
                  return Object.values(contentObj)[0];
                }
                return {};
              }
              const content = get(hit, "_source", {});
              return content;
            });
            setSearchHits(newHits);
          }
          setIsLoading(false);
          return elasticsearchResponse;
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
          <ReactiveComponent
            componentId="search"
            defaultQuery={() => ({
              aggs: {},
            })}
            react={{ and: ["term"] }}
          />
          <Tabs
            defaultActiveKey="search"
            activeKey={mlMode}
            onChange={handleTabChange}
          >
            <Tabs.TabPane tab="/v1/Search" key="search">
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
                  <CollectionDropdown
                    mlCollection={mlCollection}
                    setMlCollection={handleMlCollection}
                  />
                  <Search inputVal={inputVal} setInputVal={setInputVal} />
                </div>

                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ width: "18%", minWidth: 220 }}>
                    <Facet />
                  </div>
                  <SearchResults
                    hitsCount={hitsCount}
                    searchHits={searchHits}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="SPARQL" key="sparql">
              <div style={{ padding: 20 }}>
                <div style={{ marginBottom: 30 }}>
                  <Search inputVal={inputVal} setInputVal={setInputVal} />
                </div>

                <SparqlResults
                  searchHits={searchHits}
                  isLoading={isLoading}
                  hitsCount={hitsCount}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Optic" key="optic">
              <div style={{ padding: 20 }}>
                <div style={{ marginBottom: 30 }}>
                  <Search inputVal={inputVal} setInputVal={setInputVal} />
                </div>

                <TableLayout
                  searchHits={searchHits}
                  isLoading={isLoading}
                  hitsCount={hitsCount}
                />
              </div>
            </Tabs.TabPane>
            {/* Entity Viewer components example */}
            <Tabs.TabPane tab="Entity Viewer" key="ev">
              <div style={{ padding: 20 }}>
                <SearchBox config={{ items: [
                    {
                        label: "Member",
                        value: "Member",
                        //default: true
                    },
                    {
                        label: "Service",
                        value: "ServiceLocation"
                    },
                ]}} button="horizontal" handleSearch={setInputVal} handleSelect={setMlCollection} width="600px" />
                { hitsCount > 0 && 
                    <div style={{display: "flex", padding: "10px 0"}}>
                        {hitsCount} {hitsCount === 1 ? "result" : "results"}
                    </div>
                }
                <ResultsList 
                    data={searchResponse} 
                    config={searchConfig.search.results.config} 
                />
                {/* <div>{JSON.stringify(searchResponse)}</div> */}
              </div>
            </Tabs.TabPane>
            {/* ReGraph components example */}
            <Tabs.TabPane tab="ReGraph" key="regraph">
              <div style={{ padding: 20 }}>
                <div style={{ padding: 20 }}>
                    <div style={{ marginBottom: 30 }}>
                    <Search inputVal={inputVal} setInputVal={setInputVal} />
                    </div>
                    <Chart
                        style={{ flex: 1, width: '100%', height: '400px' }}
                        items={items}/>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </ReactiveBase>
    </div>
  );
};

export default Wrapper;

const searchConfig  = {  

    // Search view
    search: {
        "defaultEntity": "person",
    
        "results": {
            "component": "ResultsList",
            "config": {
                "entityType": {
                    "path": "_source.extracted.content[0].*~",
                    "rootRelative": false
                },
                "defaultIcon" : {
                    "type": "faCircle",
                    "color": "lightgrey"
                },
                "entities": {
                    "Member": {
                        "icon": {
                            "type": "faUser",
                            "color": "#8C85DE"
                        },
                        // "thumbnail": {
                        //     "component": "Image",
                        //     "config": {
                        //         //"arrayPath": "extracted.person.images.image",
                        //         "path": "image",
                        //         //"path": "extracted.person.images..*[?(@property === 'url')]",
                        //         "alt": "result thumbnail",
                        //         "style": {
                        //             "width": "auto",
                        //             "height": "70px"
                        //         }
                        //     }
                        // },
                        "title": {
                            "id": {
                                "path": "id"
                            },
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].Member.FullName"
                            }
                        },
                        "items": [
                        // {
                        //     "component": "Address",
                        //     "config": {
                        //         "arrayPath": "extracted.person.addresses.address",
                        //         "street1": "street",
                        //         "city": "city",
                        //         "state": "state",
                        //         "postal1": "postal",
                        //         "country": "country",
                        //         "style": {
                        //             "width": "350px",
                        //             "overflow": "hidden",
                        //             "textOverflow": "ellipsis"
                        //         }
                        //     }
                        // },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].Member.FullAddress",
                                "prefix": "Address: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].Member.Race",
                                "prefix": "Race: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].Member.YearOfDOB",
                                "prefix": "Birth Year: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].Member.SSN",
                                "prefix": "SSN: "
                            }
                        }
                        ],
                        "categories": {
                            //"arrayPath": "extracted.person.sources",
                            "path": "_source.extracted.content[0].Member.Gender",
                            //"path": "$.extracted.person.sources..*[?(@property === 'name')]",
                            // Filter out all categories NOT ("New York Times" OR "Wall Street Journal")
                            //"path": "extracted.person.sources..*[?(@property === 'name' && (@ === 'New York Times' || @ === 'Wall Street Journal'))]",
                            "colors": {
                                "Male": "#A7C7E7",
                                "Female": "#F8C8DC"
                            }
                        },
                        "timestamp": {
                            "path": "_source.extracted.content[0].Member.YearOfDOB",
                            "type": "datetime",
                            "format": "yyyy",
                            "prefix": "Birth Year: ",
                            "style": {
                                "fontStyle": "normal"
                            }
                        },
                        "status": { 
                            "path": "_source.extracted.content[0].Member.ScenarioNumber",
                            "prefix": "Type: ",
                            "style": {
                                "fontWeight": "normal"
                            }
                        },
                        // "resultActions": {
                        //     "component": "ResultActions",
                        //     "config": {
                        //         "id": "resultActions",
                        //         "arrayPath": "extracted.person.actions.action",
                        //         "action": {
                        //             "icon": "icon",
                        //             "color": "color",
                        //             "url": "url"
                        //         }
                        //     }
                        // }
                    },
                    "ServiceLocation": {
                        "icon": {
                            "type": "faStethoscope",
                            "color": "#DE3163"
                        },
                        // "thumbnail": {
                        //     "component": "Image",
                        //     "config": {
                        //         //"arrayPath": "extracted.person.images.image",
                        //         "path": "image",
                        //         //"path": "extracted.person.images..*[?(@property === 'url')]",
                        //         "alt": "result thumbnail",
                        //         "style": {
                        //             "width": "auto",
                        //             "height": "70px"
                        //         }
                        //     }
                        // },
                        "title": {
                            "id": {
                                "path": "id"
                            },
                            "component": "Concat",
                            config: {
                                items: [
                                    {
                                        path: "_source.extracted.content[0].ServiceLocation.PrimarySpeciality",
                                        suffix: ", ",
                                    },
                                    {
                                        path: "_source.extracted.content[0].ServiceLocation.Addressline1",
                                    },
                                ],
                            },
                        },
                        "items": [
                        // {
                        //     "component": "Address",
                        //     "config": {
                        //         "arrayPath": "extracted.person.addresses.address",
                        //         "street1": "street",
                        //         "city": "city",
                        //         "state": "state",
                        //         "postal1": "postal",
                        //         "country": "country",
                        //         "style": {
                        //             "width": "350px",
                        //             "overflow": "hidden",
                        //             "textOverflow": "ellipsis"
                        //         }
                        //     }
                        // },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].ServiceLocation.PhoneNumber",
                                "prefix": "Phone Number: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].ServiceLocation.ProviderNPI",
                                "prefix": "Provider ID: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].ServiceLocation.City",
                                "prefix": "City: "
                            }
                        },
                        {
                            "component": "Value",
                            "config": {
                                "path": "_source.extracted.content[0].ServiceLocation.State",
                                "prefix": "State: "
                            }
                        }
                        ],
                        "categories": {
                            //"arrayPath": "extracted.person.sources",
                            "path": "_source.extracted.content[0].Member.Gender",
                            //"path": "$.extracted.person.sources..*[?(@property === 'name')]",
                            // Filter out all categories NOT ("New York Times" OR "Wall Street Journal")
                            //"path": "extracted.person.sources..*[?(@property === 'name' && (@ === 'New York Times' || @ === 'Wall Street Journal'))]",
                            "colors": {
                                "Male": "#A7C7E7",
                                "Female": "#F8C8DC"
                            }
                        },
                        "timestamp": {
                            "path": "_source.extracted.content[0].Member.YearOfDOB",
                            "type": "datetime",
                            "format": "yyyy",
                            "prefix": "Birth Year: ",
                            "style": {
                                "fontStyle": "normal"
                            }
                        },
                        "status": { 
                            "path": "_source.extracted.content[0].Member.ScenarioNumber",
                            "prefix": "Type: ",
                            "style": {
                                "fontWeight": "normal"
                            }
                        },
                        // "resultActions": {
                        //     "component": "ResultActions",
                        //     "config": {
                        //         "id": "resultActions",
                        //         "arrayPath": "extracted.person.actions.action",
                        //         "action": {
                        //             "icon": "icon",
                        //             "color": "color",
                        //             "url": "url"
                        //         }
                        //     }
                        // }
                    }
                }
            }
        }
    }
  
}

export default searchConfig;
// import React from 'react';
// import Card from '@mui/material/Card';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { ReactWorldCountriesMap } from 'react-world-countries-map';

// function CompletedMap() {
//     const [country, setCountry] = useState([]);
//     const iso = require('iso-3166-1-alpha-2');

//     useEffect(() => {
//         const url = 'http://localhost:8080/ppini/tcountry';
//         axios.get(url).then((response) => {
//             console.log('Get req country', response.data);
//             setCountry(response.data);
//         });
//     }, []);

//     const data = [];

//     for (let i = 0; i < country.length; i++) {
//         data.push({ country: iso.getCode(country[i]._id), value: country[i].count });
//     }
//     console.log('data', data);

//     return (
//         <div>
//             <h4 style={{ textAlign: 'center' }}>Country Wise (Completed)</h4>
//             <ReactWorldCountriesMap color="#00338d" value-suffix="people" data={data} />
//         </div>
//     );
// }

// export default CompletedMap;

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './Scroll.css';
import Tooltip from '@mui/material/Tooltip';

const CompletedMap = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/ppini/tcountry';
        axios.get(url).then((response) => {
            console.log('Get req country', response.data);
            let data = [];
            for (let i = 0; i < response.data.length; i++) {
                let obj = {};
                obj['country'] = response.data[i]['_id']['country'];
                obj['value'] = response.data[i]['count'];
                data.push(obj);
            }
            setData(data);
            console.log('data', data);
        });
    }, []);

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    width: '35vw',
                    height: '41vh',
                    // overflowY: 'scroll',
                    marginLeft: '3rem',
                    marginTop: '-1rem',
                    padding: 0
                }}
                className="container"
            >
                <div style={{ position: 'relative', top: '-38px' }}>
                    <ComposableMap>
                        <Geographies geography={'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const d = data.find((d) => d['country'] === geo.properties.name);
                                    return (
                                        <>
                                            <Tooltip title={d ? `${geo.properties.name} : ${d['value']}` : ''} arrow>
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={d ? `rgba(0, 51, 141, ${d.value / 1})` : '#d1f2ff'}
                                                />
                                            </Tooltip>
                                        </>
                                    );
                                })
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
            </div>
        </>
    );
};

export default CompletedMap;

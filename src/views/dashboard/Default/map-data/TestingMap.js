// // // import React from 'react';
// // // import Card from '@mui/material/Card';
// // //
// // // import { useState, useEffect } from 'react';
// // // import { ReactWorldCountriesMap } from 'react-world-countries-map';

// // // function TestingMap() {
// // //     const [country, setCountry] = useState([]);
// // //     const iso = require('iso-3166-1-alpha-2');

// // //     useEffect(() => {
// // //         const url = 'http://localhost:8080/ppini/country';
// // //         axios.get(url).then((response) => {
// // //             console.log('Get req country', response.data);
// // //             setCountry(response.data);
// // //         });
// // //     }, []);

// // //     const data = [];

// // //     for (let i = 0; i < country.length; i++) {
// // //         data.push({ country: iso.getCode(country[i]._id), value: country[i].count });
// // //     }
// // //     console.log('data', data);

// // //     return (
// // //         <>
// // //             <h4 style={{ textAlign: 'center' }}>Country Wise (Testing)</h4>
// // //             <ReactWorldCountriesMap color="#00338d" value-suffix="people" data={data} />
// // //             {/* <ReactWorldCountriesMap size="md" color="#203864" value-suffix="people" data={data} /> */}
// // //         </>
// // //     );
// // // }

// // // export default TestingMap;

// // import React from 'react';
// // import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// // const TestingMap = () => {
// //   return (
// //     <div style={{ height: '500px', width: '100%' }}>
// //       <ComposableMap projection="geoMercator">
// //         <Geographies geographyUrl="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
// //           {({ geographies }) =>
// //             geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)
// //           }
// //         </Geographies>
// //       </ComposableMap>
// //     </div>
// //   );
// // };

// // export default TestingMap;

// import React from 'react';
// import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// import { scaleQuantize } from 'd3-scale';

// const colorScale = scaleQuantize().domain([0, 100]).range(['#ffedea', '#ffcec5', '#ffad9f', '#ff8a75', '#ff5533']);

// const WorldMap = ({ data }) => {
//   return (
//     <div style={{ height: '500px', width: '100%' }}>
//       <ComposableMap projectionConfig={{ scale: 200 }}>
//         <Geographies geographyUrl="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
//           {({ geographies }) =>
//             geographies.map((geo) => {
//               const d = data.find((s) => s.countryCode === geo.properties.ISO_A2);
//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill={d ? colorScale(d.value) : '#F5F4F6'}
//                   stroke="#FFF"
//                 />
//               );
//             })
//           }
//         </Geographies>
//       </ComposableMap>
//     </div>
//   );
// };

// export default WorldMap;

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './Scroll.css';
import Tooltip from '@mui/material/Tooltip';

const TestingMap = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/ppini/country';
        axios.get(url).then((response) => {
            console.log('Get req country', response.data);
            let data = [];
            for (let i = 0; i < response.data.length; i++) {
                let obj = {};
                obj['country'] = response.data[i]['_id'];
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
                    // marginTop: '-1rem',
                    padding: 0
                }}
                className="container"
            >
                {/* <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            > */}
                {/* <h4
                    style={{
                        position: 'relative',
                        top: '40px'
                    }}
                >
                    Testing
                </h4> */}
                <div style={{ position: 'relative', top: '-56px' }}>
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

export default TestingMap;

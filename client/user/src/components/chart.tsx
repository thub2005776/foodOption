// import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
// import ApexCharts from "apexcharts";

// export default function AreaChart() {

//     useEffect(() => {
//         const options = {
//             chart: {
//                 height: "100%",
//                 maxWidth: "100%",
//                 type: "area",
//                 fontFamily: "Inter, sans-serif",
//                 dropShadow: {
//                     enabled: false,
//                 },
//                 toolbar: {
//                     show: false,
//                 },
//             },
//             tooltip: {
//                 enabled: true,
//                 x: {
//                     show: false,
//                 },
//             },
//             fill: {
//                 type: "gradient",
//                 gradient: {
//                     opacityFrom: 0.55,
//                     opacityTo: 0,
//                     shade: "#1C64F2",
//                     gradientToColors: ["#1C64F2"],
//                 },
//             },
//             dataLabels: {
//                 enabled: false,
//             },
//             stroke: {
//                 width: 6,
//             },
//             grid: {
//                 show: false,
//                 strokeDashArray: 4,
//                 padding: {
//                     left: 2,
//                     right: 2,
//                     top: 0
//                 },
//             },
//             series: [
//                 {
//                     name: "New users",
//                     data: [6500, 6418, 6456, 6526, 6356, 6456],
//                     color: "#1A56DB",
//                 },
//             ],
//             xaxis: {
//                 categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
//                 labels: {
//                     show: false,
//                 },
//                 axisBorder: {
//                     show: false,
//                 },
//                 axisTicks: {
//                     show: false,
//                 },
//             },
//             yaxis: {
//                 show: false,
//             },
//         }

//         if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
//             const chart = new ApexCharts(document.getElementById("area-chart"), options);
//             chart.render();
//         }
//     }, [])


//     return (
//         <div>
//             <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
//                 <div className="flex justify-between">
//                     <div>
//                         <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32.4k</h5>
//                         <p className="text-base font-normal text-gray-500 dark:text-gray-400">Users this week</p>
//                     </div>
//                     <div
//                         className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
//                         12%
//                         <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
//                         </svg>
//                     </div>
//                 </div>
//                 <div id="area-chart"></div>
//                 <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
//                     <div className="flex justify-between items-center pt-5">

//                         <button
//                             id="dropdownDefaultButton"
//                             data-dropdown-toggle="lastDaysdropdown"
//                             data-dropdown-placement="bottom"
//                             className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
//                             type="button">
//                             Last 7 days
//                             <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
//                             </svg>
//                         </button>

//                         <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//                             <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
//                                 <li>
//                                     <Link to={`/`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</Link>
//                                 </li>
//                                 <li>
//                                     <Link to={`/`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</Link>
//                                 </li>
//                                 <li>
//                                     <Link to={`/`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</Link>
//                                 </li>
//                                 <li>
//                                     <Link to={`/`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</Link>
//                                 </li>
//                                 <li>
//                                     <Link to={`/`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// import { Line } from '@ant-design/plots';
// import React from 'react';
// // import ReactDOM from 'react-dom';

// export default function AreaChart () {
//   const data = [
//     { year: '1991', value: 3 },
//     { year: '1992', value: 4 },
//     { year: '1993', value: 3.5 },
//     { year: '1994', value: 5 },
//     { year: '1995', value: 4.9 },
//     { year: '1996', value: 6 },
//     { year: '1997', value: 7 },
//     { year: '1998', value: 9 },
//     { year: '1999', value: 13 },
//   ];

//   const config = {
//     data,
//     xField: 'year',
//     yField: 'value',
//     point: {
//       shapeField: 'circle',
//       sizeField: 4,
//     },
//     interaction: {
//       tooltip: {
//         marker: false,
//       },
//     },
//     style: {
//       lineWidth: 2,
//     },
//   };
//   return(
//    <div className=''>
//     <Line {...config} />
//    </div> 
//   );
// };

// ReactDOM.render(<DemoLine />, document.getElementById('container'));
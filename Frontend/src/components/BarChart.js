// // src/components/BarChart.js
// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';

// // Import necessary Chart.js components and register them
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChart = ({ month }) => {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [
//             {
//                 label: 'Number of Items',
//                 data: [],
//                 backgroundColor: 'rgba(75,192,192,0.4)',
//             }
//         ],
//     });

//     useEffect(() => {
//         const fetchChartData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/transactions/bar-chart?month=${month}`);
                
//                 // Log the response data to check its structure
//                 console.log('API Response:', response.data);
                
//                 const data = response.data;

//                 // Check if data.priceRanges exists and is an object
//                 const priceRanges = data.priceRanges || {}; // Default to an empty object if undefined

//                 setChartData({
//                     labels: Object.keys(priceRanges),
//                     datasets: [
//                         {
//                             label: 'Number of Items',
//                             data: Object.values(priceRanges),
//                             backgroundColor: 'rgba(75,192,192,0.4)',
//                         }
//                     ],
//                 });
//             } catch (error) {
//                 console.error('Error fetching bar chart data:', error.response ? error.response.data : error.message);
//             }
//         };

//         fetchChartData();
//     }, [month]);

//     return (
//         <div>
//             <h2>Bar Chart of Price Ranges</h2>
//             {chartData.labels.length > 0 ? (
//                 <Bar data={chartData} />
//             ) : (
//                 <p>Loading chart data...</p>
//             )}
//         </div>
//     );
// };

// export default BarChart;





// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// Import necessary Chart.js components and helpers
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = ({ month }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Number of Items',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.4)',
                datalabels: {
                    color: 'black',
                    align: 'end',
                    anchor: 'end',
                },
            }
        ],
    });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/transactions/bar-chart?month=${month}`);
                
                // Log the response data to check its structure
                console.log('API Response:', response.data);
                
                const data = response.data;

                // Check if data.priceRanges exists and is an object
                const priceRanges = data.priceRanges || {}; // Default to an empty object if undefined

                setChartData({
                    labels: Object.keys(priceRanges),
                    datasets: [
                        {
                            label: 'Number of Items',
                            data: Object.values(priceRanges),
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            datalabels: {
                                color: 'black',
                                align: 'end',
                                anchor: 'end',
                            },
                        }
                    ],
                });
            } catch (error) {
                console.error('Error fetching bar chart data:', error.response ? error.response.data : error.message);
            }
        };

        fetchChartData();
    }, [month]);

    return (
        <div>
            <h2>Bar Chart of Price Ranges</h2>
            {chartData.labels.length > 0 ? (
                <Bar data={chartData} options={{ plugins: { datalabels: { display: true } } }} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default BarChart;






// // src/components/BarChart.js
// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// const BarChart = ({ month }) => {
//     const [chartData, setChartData] = useState({
//         labels: [],
//         datasets: [
//             {
//                 label: 'Number of Items',
//                 data: [],
//                 backgroundColor: 'rgba(75,192,192,0.4)',
//                 datalabels: {
//                     color: 'black',
//                     align: 'end',
//                     anchor: 'end',
//                 },
//             }
//         ],
//     });

//     useEffect(() => {
//         const fetchChartData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/transactions/bar-chart?month=${month}`);
                
//                 console.log('API Response:', response.data);
                
//                 const data = response.data;
//                 const priceRanges = data.priceRanges || {};

//                 const labels = Object.keys(priceRanges);
//                 const dataValues = Object.values(priceRanges);

//                 console.log('Labels:', labels);
//                 console.log('Data:', dataValues);

//                 setChartData({
//                     labels: labels,
//                     datasets: [
//                         {
//                             label: 'Number of Items',
//                             data: dataValues,
//                             backgroundColor: 'rgba(75,192,192,0.4)',
//                             datalabels: {
//                                 color: 'black',
//                                 align: 'end',
//                                 anchor: 'end',
//                             },
//                         }
//                     ],
//                 });
//             } catch (error) {
//                 console.error('Error fetching bar chart data:', error.response ? error.response.data : error.message);
//             }
//         };

//         fetchChartData();
//     }, [month]);

//     const allZero = chartData.datasets[0].data.every(value => value === 0);

//     return (
//         <div>
//             <h2>Bar Chart of Price Ranges</h2>
//             {allZero ? (
//                 <p>No data available for the selected month.</p>
//             ) : (
//                 <Bar data={chartData} options={{ plugins: { datalabels: { display: true } } }} />
//             )}
//         </div>
//     );
// };

// export default BarChart;

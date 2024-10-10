// // src/App.js
// import React, { useState, useEffect } from 'react';
// import TransactionTable from './components/TransactionTable';
// // import TransactionStats from './components/TransactionStats';
// // import BarChart from './components/BarChart';
// import axios from 'axios';

// const App = () => {
//     const [month, setMonth] = useState('March'); // Default month
//     const [transactions, setTransactions] = useState([]);
//     const [stats, setStats] = useState({});
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [search, setSearch] = useState('');

//     const monthOptions = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

//     const fetchTransactions = async (searchText = '') => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/transactions?month=${month}&page=${currentPage}&search=${searchText}`);
//             console.log('API Response:', response.data); // Log API response
//             setTransactions(response.data.transactions);
//             setTotalPages(response.data.totalPages);
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//         }
//     };

//     const fetchStats = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/transactions/stats?month=${month}`);
//             console.log('Stats fetched:', response.data);
//             setStats(response.data);
//         } catch (error) {
//             console.error('Error fetching stats:', error);
//         }
//     };

//     useEffect(() => {
//         fetchTransactions();
//         fetchStats();
//     }, [month, currentPage]); // Fetch data whenever month or page changes

//     const handleSearch = (searchText) => {
//         setSearch(searchText);
//         fetchTransactions(searchText);
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(prevPage => prevPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(prevPage => prevPage - 1);
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Transaction Dashboard</h1>
//             <select value={month} onChange={(e) => setMonth(e.target.value)}>
//                 {monthOptions.map((m, index) => (
//                     <option key={index} value={m}>{m}</option>
//                 ))}
//             </select>
//             {/* <TransactionStats stats={stats} /> */}
//             <TransactionTable 
//                 transactions={transactions} 
//                 search={search} 
//                 onSearch={handleSearch} 
//                 onNext={handleNextPage} 
//                 onPrevious={handlePreviousPage} 
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//             />
//             {/* <BarChart month={month} /> */}
//         </div>
//     );
// };

// export default App;







// src/App.js
import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import TransactionStats from './components/TransactionStats';
import BarChart from './components/BarChart';
import axios from 'axios';

const App = () => {
    const [month, setMonth] = useState('March'); // Default month
    const [transactions, setTransactions] = useState([]);
    const [stats, setStats] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');

    const monthOptions = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const fetchTransactions = async (searchText = '') => {
        try {
            const response = await axios.get(`http://localhost:5000/api/transactions?month=${month}&page=${currentPage}&search=${searchText}`);
            console.log('API Response:', response.data); // Log API response
            setTransactions(response.data.transactions);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/transactions/stats?month=${month}`);
            console.log('Stats fetched:', response.data);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchStats();
    }, [month, currentPage]); // Fetch data whenever month or page changes

    const handleSearch = (searchText) => {
        setSearch(searchText);
        fetchTransactions(searchText);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="App">
            <h1>Transaction Dashboard</h1>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {monthOptions.map((m, index) => (
                    <option key={index} value={m}>{m}</option>
                ))}
            </select>
            <TransactionStats stats={stats} /> {/* Render TransactionStats */}
            <TransactionTable 
                transactions={transactions} 
                search={search} 
                onSearch={handleSearch} 
                onNext={handleNextPage} 
                onPrevious={handlePreviousPage} 
                currentPage={currentPage}
                totalPages={totalPages}
            />
            <BarChart month={month} /> {/* Render BarChart */}
        </div>
    );
};

export default App;


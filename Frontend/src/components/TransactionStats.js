import React from 'react';

const TransactionStats = ({ stats }) => {
    return (
        <div className="stats">
            <h2>Transaction Statistics</h2>
            <p>Total Sales: {stats.totalSales || 'Loading...'}</p>
            <p>Total Sold Items: {stats.totalSold || 'Loading...'}</p>
            <p>Total Not Sold Items: {stats.totalNotSold || 'Loading...'}</p>
        </div>
    );
};

export default TransactionStats;

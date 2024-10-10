const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize database
router.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        // Clear existing data
        await Transaction.deleteMany({});

        // Insert new data
        await Transaction.insertMany(transactions);

        res.json({ message: 'Database initialized successfully!' });
    } catch (err) {
        console.error('Error initializing database:', err);
        res.status(500).json({ message: 'Error initializing database' });
    }
});

// Fetch transactions with pagination and search
router.get('/', async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const query = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } }
            ]
        } : {};

        const transactions = await Transaction.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Transaction.countDocuments(query);

        res.json({
            transactions,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});

// Get transaction statistics
router.get('/stats', async (req, res) => {
    try {
        const totalSales = await Transaction.aggregate([{ $group: { _id: null, total: { $sum: "$price" } } }]);
        const soldItemsCount = await Transaction.countDocuments({ sold: true });
        const notSoldItemsCount = await Transaction.countDocuments({ sold: false });

        res.json({
            totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
            totalSoldItems: soldItemsCount,
            totalNotSoldItems: notSoldItemsCount
        });
    } catch (err) {
        console.error('Error fetching statistics:', err);
        res.status(500).json({ message: 'Error fetching statistics' });
    }
});

// Bar chart data for price ranges
router.get('/bar-chart', async (req, res) => {
    const { month } = req.query;

    try {
        const transactions = await Transaction.find({
            dateOfSale: {
                $gte: new Date(`${month} 1, 2023`),
                $lte: new Date(`${month} 31, 2023`)
            }
        });

        const priceRanges = {
            "0-100": 0,
            "101-500": 0,
            "501-1000": 0,
            "1001-5000": 0,
            "5001-10000": 0,
            "10001+": 0
        };

        transactions.forEach((transaction) => {
            if (transaction.price <= 100) priceRanges["0-100"]++;
            else if (transaction.price <= 500) priceRanges["101-500"]++;
            else if (transaction.price <= 1000) priceRanges["501-1000"]++;
            else if (transaction.price <= 5000) priceRanges["1001-5000"]++;
            else if (transaction.price <= 10000) priceRanges["5001-10000"]++;
            else priceRanges["10001+"]++;
        });

        res.json({ priceRanges });
    } catch (err) {
        console.error('Error fetching bar chart data:', err);
        res.status(500).json({ message: 'Error fetching bar chart data' });
    }
});

// Fetch a transaction by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (err) {
        console.error('Error fetching transaction by ID:', err);
        res.status(500).json({ message: 'Error fetching transaction' });
    }
});

module.exports = router;

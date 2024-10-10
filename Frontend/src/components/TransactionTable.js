import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionTable.css'; // Importing CSS

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [newTransaction, setNewTransaction] = useState({
        title: '',
        description: '',
        price: '',
        dateOfSale: '',
        category: '',
        sold: false
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, [page, searchQuery, selectedMonth]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/transactions?page=${page}&search=${searchQuery}&month=${selectedMonth}`);
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        }
    };

    const handleAddOrUpdateTransaction = async (e) => {
        e.preventDefault();
        if (isEditing) {
            handleUpdateTransaction(isEditing);
        } else {
            handleAddTransaction();
        }
    };

    const handleAddTransaction = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/transactions', newTransaction);
            setTransactions([...transactions, response.data]);
            resetForm();
        } catch (error) {
            console.error('Failed to add transaction:', error);
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/transactions/${id}`);
            setTransactions(transactions.filter(transaction => transaction._id !== id));
        } catch (error) {
            console.error('Failed to delete transaction:', error);
        }
    };

    const handleUpdateTransaction = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/transactions/${id}`, newTransaction);
            const updatedTransactions = transactions.map(transaction =>
                transaction._id === id ? response.data : transaction
            );
            setTransactions(updatedTransactions);
            setIsEditing(null);
            resetForm();
        } catch (error) {
            console.error('Failed to update transaction:', error);
        }
    };

    const handleEditClick = (transaction) => {
        setIsEditing(transaction._id);
        setNewTransaction(transaction);
    };

    const resetForm = () => {
        setNewTransaction({
            title: '',
            description: '',
            price: '',
            dateOfSale: '',
            category: '',
            sold: false
        });
        setIsEditing(null);
    };

    return (
        <div className="container">
            <h2>Transactions</h2>

            {/* Form to add or update a transaction */}
            <form onSubmit={handleAddOrUpdateTransaction}>
                <input
                    type="text"
                    placeholder="Title"
                    value={newTransaction.title}
                    onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newTransaction.price}
                    onChange={(e) => setNewTransaction({ ...newTransaction, price: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date of Sale"
                    value={newTransaction.dateOfSale}
                    onChange={(e) => setNewTransaction({ ...newTransaction, dateOfSale: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                />
                <label>
                    Sold:
                    <input
                        type="checkbox"
                        checked={newTransaction.sold}
                        onChange={(e) => setNewTransaction({ ...newTransaction, sold: e.target.checked })}
                    />
                </label>
                <button type="submit">{isEditing ? 'Update' : 'Add'} Transaction</button>
            </form>

            {/* Search and Month Filter */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Transactions"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    {/* Add other months here */}
                </select>
            </div>

            {/* Transactions Table */}
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{transaction.dateOfSale}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleEditClick(transaction)}>Edit</button>
                                    <button onClick={() => handleDeleteTransaction(transaction._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default TransactionTable;

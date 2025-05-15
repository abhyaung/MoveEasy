import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../TransactionHistory.css'; // Assuming you have a CSS file named TransactionHistory.css

const TransactionHistory = () => {
    const [orderId, setOrderId] = useState('');
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState('');

    const fetchTransaction = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/payments/${orderId}`);
            setTransaction(response.data);
            console.log(response.data);
            setError('');
        } catch (err) {
            setError('Transaction not found or error fetching transaction.');
            setTransaction(null);
        }
    };

    return (
        <div className="transaction-history">
            <h1>Transaction History</h1>
            <input
                type="text"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
            />
            <button onClick={fetchTransaction}>Submit</button>
            {transaction && transaction.length &&  (
                <div className="transaction-details">
                    <p>Order ID: {transaction[0].orderId}</p>
                    <p>Name: {transaction[0].name}</p>
                    <p>Total Price: ${transaction[0].totalCost}</p>
                    <p>Date : {format(new Date(transaction[0].createdAt), 'MM/dd/yyyy')}</p>

                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default TransactionHistory;

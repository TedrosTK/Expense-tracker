import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EntryList from './EntryList';
import './App.css';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

function App() {
    const [entries, setEntries] = useState([]);
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/entries')
            .then(response => setEntries(response.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = { type, amount, category, date };
        axios.post('http://localhost:3001/api/entries', newEntry)
            .then(response => {
                setEntries([...entries, response.data]);
                setType('');
                setAmount('');
                setCategory('');
                setDate('');
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/entries/${id}`)
            .then(() => {
                setEntries(entries.filter(entry => entry._id !== id));
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h3" align="center" gutterBottom>
                Expense Tracker
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Type (Income/Expense)" value={type} onChange={(e) => setType(e.target.value)} required />
                <TextField type="number" label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} required InputLabelProps={{ shrink: true }} />
                <Button variant="contained" color="primary" type="submit">
                    Add Entry
                </Button>
            </Box>
            <EntryList entries={entries} handleDelete={handleDelete} />
        </Container>
    );
}

export default App;

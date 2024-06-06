import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EntryList = ({ entries, handleDelete }) => (
    <List>
        {entries.map(entry => (
            <ListItem key={entry._id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(entry._id)}>
                    <DeleteIcon />
                </IconButton>
            }>
                <ListItemText primary={`${entry.type} - ${entry.amount} - ${entry.category} - ${new Date(entry.date).toLocaleDateString()}`} />
            </ListItem>
        ))}
    </List>
);

export default EntryList;

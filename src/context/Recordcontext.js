import React, { createContext, useState, useEffect } from 'react';

const RecordContext = createContext();

export const RecordProvider = ({ children }) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch initial records on load
        const fetchRecords = async () => {
            setLoading(true);
            try {
                // Replace with your API endpoint
                const response = await fetch('/api/records');
                const data = await response.json();
                setRecords(data);
            } catch (err) {
                console.error('Error fetching records:', err);
                setError('Failed to load records.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, []);

    const addRecord = async (newRecord) => {
        try {
            // Replace with your API endpoint
            const response = await fetch('/api/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecord),
            });

            if (response.ok) {
                const createdRecord = await response.json();
                setRecords((prevRecords) => [...prevRecords, createdRecord]);
            } else {
                throw new Error('Failed to add record.');
            }
        } catch (err) {
            console.error('Error adding record:', err);
            setError('Failed to add record.');
        }
    };

    const updateRecord = async (id, updatedData) => {
        try {
            // Replace with your API endpoint
            const response = await fetch(`/api/records/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedRecord = await response.json();
                setRecords((prevRecords) =>
                    prevRecords.map((record) =>
                        record.id === id ? updatedRecord : record
                    )
                );
            } else {
                throw new Error('Failed to update record.');
            }
        } catch (err) {
            console.error('Error updating record:', err);
            setError('Failed to update record.');
        }
    };

    const deleteRecord = async (id) => {
        try {
            // Replace with your API endpoint
            const response = await fetch(`/api/records/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setRecords((prevRecords) =>
                    prevRecords.filter((record) => record.id !== id)
                );
            } else {
                throw new Error('Failed to delete record.');
            }
        } catch (err) {
            console.error('Error deleting record:', err);
            setError('Failed to delete record.');
        }
    };

    return (
        <RecordContext.Provider
            value={{ records, loading, error, addRecord, updateRecord, deleteRecord }}
        >
            {children}
        </RecordContext.Provider>
    );
};

export default RecordContext;

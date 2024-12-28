import React, { useState, useEffect } from 'react';
import '../styles/PatientDashboard.css';

const PatientDashboard = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        // Fetch the patient's medical records
        // Replace with your API endpoint
        const fetchRecords = async () => {
            try {
                const response = await fetch('/api/records');
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, []);

    return (
        <div className="patient-dashboard-container">
            <h1>Patient Dashboard</h1>
            <div className="records-list">
                <h2>Your Medical Records</h2>
                {records.length > 0 ? (
                    <ul>
                        {records.map((record) => (
                            <li key={record.id} className="record-item">
                                <div>
                                    <strong>Date:</strong> {record.date}
                                </div>
                                <div>
                                    <strong>Diagnosis:</strong> {record.diagnosis}
                                </div>
                                <div>
                                    <strong>Treatment:</strong> {record.treatment}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No medical records found.</p>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DoctorDashboard.css';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Fetch the list of patients assigned to the doctor
        // Replace with your API endpoint
        const fetchPatients = async () => {
            try {
                const response = await fetch('/api/patients');
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    return (
        <div className="doctor-dashboard-container">
            <h1>Doctor Dashboard</h1>
            <div className="patient-list">
                <h2>Assigned Patients</h2>
                {patients.length > 0 ? (
                    <ul>
                        {patients.map((patient) => (
                            <li key={patient.id}>
                                <Link to={`/patient/${patient.id}`} className="patient-link">
                                    {patient.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No patients assigned yet.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;

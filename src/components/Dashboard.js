import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="welcome-section">
                <h1>Welcome to the Patient Record Management System</h1>
                <p>Manage your medical records seamlessly with our interactive dashboard.</p>
            </div>
            <div className="dashboard-grid">
                <Link to="/patient-dashboard" className="dashboard-card">
                    <div className="card-content">
                        <h2>Patient Dashboard</h2>
                        <p>Access your medical records and stay updated with your health status.</p>
                    </div>
                </Link>
                <Link to="/doctor-dashboard" className="dashboard-card">
                    <div className="card-content">
                        <h2>Doctor Dashboard</h2>
                        <p>Manage patient records and provide the best care with ease.</p>
                    </div>
                </Link>
                <Link to="/transfer" className="dashboard-card">
                    <div className="card-content">
                        <h2>Transfer Records</h2>
                        <p>Easily transfer patient records to other doctors securely.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

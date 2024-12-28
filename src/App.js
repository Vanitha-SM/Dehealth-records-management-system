import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import TransferPage from './components/TransferPage';
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patient-dashboard" element={<PatientDashboard />} />
                        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                        <Route path="/transfer" element={<TransferPage />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

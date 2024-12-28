import React, { useState, useEffect } from 'react';
import '../styles/TransferPage.css';

const TransferPage = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch patients and doctors from the API
        const fetchData = async () => {
            try {
                const patientResponse = await fetch('/api/patients');
                const doctorResponse = await fetch('/api/doctors');
                const patientData = await patientResponse.json();
                const doctorData = await doctorResponse.json();
                setPatients(patientData);
                setDoctors(doctorData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();

        if (!selectedPatient || !selectedDoctor) {
            setMessage('Please select both a patient and a doctor.');
            return;
        }

        try {
            const response = await fetch('/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patientId: selectedPatient, doctorId: selectedDoctor }),
            });

            if (response.ok) {
                setMessage('Patient successfully transferred.');
                setSelectedPatient('');
                setSelectedDoctor('');
            } else {
                const data = await response.json();
                setMessage(data.message || 'Transfer failed.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="transfer-container">
            <h1>Transfer Patient</h1>
            <form onSubmit={handleTransfer} className="transfer-form">
                <div className="form-group">
                    <label htmlFor="patient">Select Patient</label>
                    <select
                        id="patient"
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                    >
                        <option value="">-- Select a Patient --</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="doctor">Select Doctor</label>
                    <select
                        id="doctor"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        <option value="">-- Select a Doctor --</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>
                {message && <div className="message">{message}</div>}
                <button type="submit" className="transfer-button">Transfer</button>
            </form>
        </div>
    );
};

export default TransferPage;

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email, password) => {
        if (email === 'test@example.com' && password === 'password') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ login, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

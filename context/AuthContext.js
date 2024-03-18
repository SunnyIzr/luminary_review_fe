import React, { createContext, useContext, useState, useEffect } from 'react';
const { root_domain } = require("@/constants/root_url");

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [accessibleTiers, setAccessibleTiers] = useState([]);

    useEffect(() => {
        // Check for token in localStorage when app loads
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
            // Make a request to fetch user name using the token
            fetchUserName(token);
        }
    }, []);

    const fetchUserName = (token) => {
        // Make a request to fetch user name using the token
        // Replace the URL with your actual API endpoint
        fetch(`${root_domain}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            // Save the user name in state
            console.log(data)
            setUserName(data.first_name);
            setAccessibleTiers(data.accessible_content_tiers);
        })
        .catch(error => {
            console.error('Error fetching user name:', error);
            setAuthToken(null)
        });
    };

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        // Make a request to fetch user name using the token
        fetchUserName(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUserName(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, userName, accessibleTiers, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
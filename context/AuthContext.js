import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
const { root_domain } = require("@/constants/root_url");

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [accessibleTiers, setAccessibleTiers] = useState([]);
    const { getAccessTokenSilently, user } = useAuth0();

    useEffect(() => {
    }, []);

    const fetchToken = async () => {
        const token = await getAccessTokenSilently({
            audience: `luminary-review-api.com`,
            scope: "read:current_user",
        })
        console.log('obtained accessToken', token)
        return token
    };

    const fetchUserData = async (token) => {
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
            console.log("Successfully pulled user data")
            console.log(data)
            setUserName(data.first_name);
            setAccessibleTiers(data.accessible_content_tiers);
        })
        .catch(error => {
            console.error('Error fetching user name:', error);
        });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUserName(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, userName, accessibleTiers, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
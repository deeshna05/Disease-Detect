// src/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update this URL to match your Django server

// Function to detect disease based on selected symptoms
export const detectDisease = async (symptoms) => {
    try {
        const response = await axios.post(`${API_URL}/detect-disease/`, { symptoms });
        return response.data; // Return the data received from the backend
    } catch (error) {
        console.error("Error detecting disease:", error);
        throw error; // Throw error for further handling if needed
    }
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Myaccount.css';

const Myaccount = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const [loading, setLoading] = useState(true); // State to track loading

  // Function to simulate user authentication
  const authenticateUser = async () => {
    // Replace with actual authentication logic
    const token = localStorage.getItem('token'); // Assuming you're storing the token in local storage
    if (token) {
      setIsAuthenticated(true);
      return token; // Return the token for API requests
    }
    return null;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = await authenticateUser(); // Get the user token
      if (isAuthenticated && token) {
        try {
          const response = await axios.get('/api/userdata', {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure you're sending the correct token
            },
          });
          console.log('User info fetched:', response.data); // Debugging: log the fetched data
          setUserInfo(response.data); // Set the userInfo with API data
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchUserInfo();
  }, [isAuthenticated]);

  if (loading) {
    return <div className="myaccount">Loading user information...</div>; // Show loading message
  }

  if (!isAuthenticated) {
    return <div className="myaccount">Please log in to access your account.</div>;
  }

  return (
    <div className="myaccount">
      <div className="account-box">
        {userInfo ? (
          <>
            <h1>Welcome, {userInfo.name || 'User'}</h1>
            <h2>Your Information:</h2>
            <table>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>{userInfo.email || 'N/A'}</td>
                </tr>
                {/* Add more rows for additional user info if needed */}
              </tbody>
            </table>
          </>
        ) : (
          <p>No user information available.</p>
        )}
      </div>
    </div>
  );
};

export default Myaccount;

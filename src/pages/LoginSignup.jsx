import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LoginSignup.css'; // Import the CSS file

const LoginSignup = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/ml_app/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (response.status === 200) {
        const data = await response.json();
        const userData = { name: data.name, token: data.token };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/'); // Redirect to homepage after successful login
      } else if (response.status === 401) {
        alert('Invalid email or password. Please try again.'); // Show error message
      } else {
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please check your network and try again.');
    }
  };

  // Function to handle signup
  const handleSignup = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/ml_app/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.status === 201) {
        const data = await response.json();
        const userData = { name: formData.name, token: data.token };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/'); // Redirect to homepage after successful signup
      } else if (response.status === 400) {
        alert('User with this email already exists or required fields are missing.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred while signing up. Please check your network and try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="login-signup-container">
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <div className="form-toggle">
            <button 
              className={isSignup ? '' : 'active'} 
              onClick={() => setIsSignup(false)}>
              Login
            </button>
            <button 
              className={isSignup ? 'active' : ''} 
              onClick={() => setIsSignup(true)}>
              Signup
            </button>
          </div>
          <h2>{isSignup ? 'Signup' : 'Login'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            isSignup ? handleSignup() : handleLogin();
          }}>
            {isSignup && (
              <div className="input-container">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">
              {isSignup ? 'Signup' : 'Login'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;

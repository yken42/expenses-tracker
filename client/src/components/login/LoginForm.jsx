import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies  from 'js-cookie';

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users/protected", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if(res.ok) {
                    navigate('/overview', { replace: true });
                } else {
                    setLoading(false);
                }
                // If request succeeds, user is authenticated
                navigate('/overview', { replace: true }); // Added replace: true to prevent back navigation
            } catch (error) {
                // Only show login form if not authenticated
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    useEffect(() => {
      const isAuth = Cookies.get("isAuth");
      if(isAuth) {
        navigate('/overview', { replace: true });
      }
    }, []);
    

    // Show loading state while checking auth
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await axios.post(
              "http://localhost:3000/api/users/login",
              { email, password },
              { withCredentials: true }
            );
            if(res.status === 200) {
              Cookies.set("isAuth", true);    
              navigate('/overview');
            } else {
              setError(res.data?.message || "Login failed");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    }

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
}

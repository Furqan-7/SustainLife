import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { UserData } from './types';

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const data = await res.json();
      setUserData(data.user);
    } catch (err) {
      console.error("Failed to fetch dashboard", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

 if (!userData) return null;

return (
  <div>
    <Header userData={userData} />
  </div>
);
}
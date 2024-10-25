import React from 'react';
import './Admin.css'; // Import the CSS file

const AdminDashboard = () => {
  const options = [
    {
      title: "Create Assessment",
      image: require("./Admin1.png"), // Replace with the correct image path
    },
    {
      title: "Upload Questions",
      image: require("./Admin3.png"), // Replace with the correct image path
    },
    {
      title: "Assessment Result Lists",
      image: require("./Admin2.png"), // Replace with the correct image path
    },
    {
      title: "Suspicious Activities",
      image: require("./Admin4.png"), // Replace with the correct image path
    },
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="welcome-message">Welcome Admin !!!</h1>
      <h2 className="choice">What do you like to do?</h2>
    </div>
  );
};

export default AdminDashboard;

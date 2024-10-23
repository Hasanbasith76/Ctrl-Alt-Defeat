import React from 'react';
import './Admin.css'; // Import the CSS file

const AdminDashboard = () => {
  const options = [
    {
      title: "Create Assessment",
      image: "/Admin1.png", // Replace with the correct image path
    },
    {
      title: "Upload Questions",
      image: "/Admin3.png", // Replace with the correct image path
    },
    {
      title: "Assessment Result Lists",
      image: "/Admin2.png", // Replace with the correct image path
    },
    {
      title: "Suspicious Activities",
      image: "/Admin4.png", // Replace with the correct image path
    },
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="welcome-message">Welcome Admin !!!</h1>
      <h2 className="choice">What do you like to do?</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <div key={index} className="option-card">
            <img src={option.image} alt={option.title} className="option-image" />
            <h2 className="option-title">{option.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

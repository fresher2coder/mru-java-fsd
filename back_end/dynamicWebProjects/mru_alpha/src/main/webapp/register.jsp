<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vehicle Registration Form</title>
  <style type="text/css">
  /* styles.css */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
}

input, select {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
  
  </style>
</head>
<body>
  <div class="form-container">
    <h1>Vehicle Registration Form</h1>
    <form action="register" method="post">
      <!-- Username and Password Fields -->
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" placeholder="Create a username" required>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Create a password" required>

      <!-- Other Registration Fields -->
      <label for="ownerName">Owner's Name:</label>
      <input type="text" id="ownerName" name="ownerName" placeholder="Enter owner's name" required>

      <label for="vehicleType">Vehicle Type:</label>
      <select id="vehicleType" name="vehicleType" required>
        <option value="">Select vehicle type</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="truck">Truck</option>
      </select>

      <label for="registrationNumber">Registration Number:</label>
      <input type="text" id="registrationNumber" name="registrationNumber" placeholder="Enter registration number" required>

      <label for="color">Color:</label>
      <input type="text" id="color" name="color" placeholder="Enter vehicle color" required>

      <button type="submit">Register</button>
    </form>
  </div>
</body>
</html>

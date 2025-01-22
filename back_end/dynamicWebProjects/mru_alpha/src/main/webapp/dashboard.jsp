<% if(session == null || session.getAttribute("username") == null){
	response.sendRedirect("login.jsp");
	return;
}%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .container {
            width: 50%;
            margin: auto;
            text-align: center;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #333;
        }
        p {
            font-size: 1.2em;
            color: #555;
        }
        button {
            padding: 10px 20px;
            font-size: 1em;
            color: white;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to the Dashboard</h1>

        <!-- Display student details -->
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Gender:</strong> ${student.gender}</p>
        <p><strong>Course:</strong> ${student.course}</p>
        <p><strong>Address:</strong> ${student.address}</p>

        <!-- Logout button -->
        <form action="logout" method="get">
            <button type="submit">Logout</button>
        </form>
    </div>
</body>
</html>

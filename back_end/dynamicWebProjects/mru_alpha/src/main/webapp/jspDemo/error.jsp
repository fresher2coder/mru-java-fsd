<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page isErrorPage="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
 	<h1>Error</h1>
 	<% if (exception!=null) {%>
 	<h2><%= exception.getMessage() %></h2>
 	<%} %>
</body>
</html>
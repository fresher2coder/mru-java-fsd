<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="custom" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h4 style="color: Green;">
		<custom:if test="${not empty success}">
            ${success}
        </custom:if>
	</h4>
	<a href='${link}'>Click here to ${message}</a>
</body>
</html>
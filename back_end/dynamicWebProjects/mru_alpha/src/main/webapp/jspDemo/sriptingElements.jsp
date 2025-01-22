<%@ page import='java.time.*, java.util.Scanner'%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%--JSP Directive --%>
	<%@ include file="hearder.jsp"%>

	<%--JSP Declarative --%>
	<%!
	String name = "JSP";

	void show() {
		//Goes as a instance method.
	}%>
	
	<h1>Welcome To Java Server Page!</h1>

	<h2>
	<%--JSP Scriptlets--%>
		<%
		out.println(LocalDate.now());
		%>
	</h2>
	
	
	int a=10, b=20;
	<h2>
		<%
		int a = 10, b = 20;
		out.println("Hi JSP!");
		%>
	</h2>
	<h3>Sum:</h3>
	<%--JSP Expression--%>
	<input type="text" value=<%= a + b %>>

	<%@ include file="footer.jsp"%>

</body>
</html>
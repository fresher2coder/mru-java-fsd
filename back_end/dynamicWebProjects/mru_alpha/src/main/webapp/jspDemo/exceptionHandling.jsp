<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>

<%@ page errorPage="error.jsp" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<%-- <h1><%
		
	try{
		int a = 5/0;
	
		out.println(a);
	}
	catch(Exception e){
		out.println(e.getMessage());
	}
	%></h1> --%>

	<%
	int a[] = {10, 20};
	out.println(a[2]);
	%>


</body>
</html>
package demo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class InitServlet extends HttpServlet {

	private String appVersion;

	@Override
	public void init() throws ServletException {
		// Retrieve a parameter from the web.xml (or ServletConfig annotation)
		appVersion = getServletConfig().getInitParameter("appVersion");

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.write("<h1>Servlet Initialized</h1>");
		out.write("<h2>" + appVersion + "</h2>");
		out.write("""
				<a href="index.html">Go to Home</a><br>
				""");

	}
}

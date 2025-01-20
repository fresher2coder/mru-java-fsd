package demo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

// Annotation-based Servlet mapping
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// Set response content type
		response.setContentType("text/html");

		PrintWriter out = response.getWriter();		
		out.write("""

				        <h1>Hello, World!</h1>
				        <p>This is a simple Servlet example.</p>

				""");

		// Set response content type to JSON
//		response.setContentType("application/json");
//		response.setCharacterEncoding("UTF-8");
//		
//		response.getWriter().write("""
//				    {
//				        "message": "Hello, World!",
//				        "description": "This is a simple Servlet example."
//				    }
//				""");
	}
}

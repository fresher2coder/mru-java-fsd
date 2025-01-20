package demo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/greet")
public class GreetingServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("text/html");
		response.getWriter().write("""

				        <form method="post" action="greet">
				            <label for="name">Enter your name:</label>
				            <input type="text" id="name" name="name" required>
				            <button type="submit">Submit</button>
				        </form>

				""");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String name = request.getParameter("name");
        response.setContentType("text/html");
        response.getWriter().write(        	   
        	    "<body>" +
        	    "<h2>Hello, " + name + "!</h2>" +
        	    "</body>"         	    
        	);

    }
}

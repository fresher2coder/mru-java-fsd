package demo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet("/contextGreet")
public class ContextGreetingServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get shared data from ServletContext
        String globalMessage = getServletContext().getAttribute("globalMessage").toString();

        response.setContentType("text/html");
        
        PrintWriter out = response.getWriter();
        out.write("<h1>" + globalMessage + "</h1>");
        out.write(""" 
				<a href="index.html">Go to Home</a><br>
				""");
    }
}

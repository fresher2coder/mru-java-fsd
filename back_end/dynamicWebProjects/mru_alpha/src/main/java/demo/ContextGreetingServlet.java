package demo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/contextGreet")
public class ContextGreetingServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get shared data from ServletContext
        String globalMessage = getServletContext().getAttribute("globalMessage").toString();

        response.setContentType("text/html");
        response.getWriter().write("<h1>" + globalMessage + "</h1>");
    }
}

package login_system;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import login_system.dto.Student;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	PrintWriter out = response.getWriter();
    	
    	HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("student") == null) {
            response.sendRedirect("login.html");
            return;
        }

        Student student = (Student) session.getAttribute("student");

        response.setContentType("text/html");
        out.println("<h1>Welcome to the Dashboard</h1>");
        out.println("<p>Name: " + student.getName() + "</p>");
        out.println("<p>Email: " + student.getEmail() + "</p>");
        out.println("<p>Gender: " + student.getGender() + "</p>");
        out.println("<p>Course: " + student.getCourse() + "</p>");
        out.println("<p>Address: " + student.getAddress() + "</p>");
        out.println("<br>");
        out.println("<form action='logout' method='get'>");
        out.println("<button type='submit'>Logout</button>");
        out.println("</form>");
    }
}

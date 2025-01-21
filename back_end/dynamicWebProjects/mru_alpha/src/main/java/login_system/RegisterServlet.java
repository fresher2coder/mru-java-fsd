package login_system;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve form data
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String dob = request.getParameter("dob");
        String gender = request.getParameter("gender");
        String course = request.getParameter("course");
        String address = request.getParameter("address");

        // Set content type
        response.setContentType("text/html");

        // Generate response
        PrintWriter out = response.getWriter();
        
        out.write("<h1>Student Registration Successful</h1>");
        out.write("<p><strong>Name:</strong> " + name + "</p>");
        out.write("<p><strong>Email:</strong> " + email + "</p>");
        out.write("<p><strong>Date of Birth:</strong> " + dob + "</p>");
        out.write("<p><strong>Gender:</strong> " + gender + "</p>");
        out.write("<p><strong>Course:</strong> " + course + "</p>");
        out.write("<p><strong>Address:</strong> " + address + "</p>");
        
        
        out.write(""" 
				<a href="index.html">Go to Home</a><br>
				""");
        
        
    }
}

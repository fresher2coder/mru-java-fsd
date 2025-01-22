package login_system;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import login_system.dto.Student;
import login_system.dto.UserStore;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
    	
    	String username = request.getParameter("username");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String dob = request.getParameter("dob");
        String gender = request.getParameter("gender");
        String course = request.getParameter("course");
        String address = request.getParameter("address");

        Student student = new Student(username, password, name, email, dob, gender, course, address);
        
        if (UserStore.registerStudent(student)) {
            out.println("<h1>Registration Successful!</h1>");
            out.println("<a href='login.html'>Go to Login</a>");
        } else {
            out.println("<h1>Registration Failed!</h1>");
            out.println("<p>Username already exists. Try again.</p>");
            out.println("<a href='register.html'>Back to Registration</a>");
        }
    }
}

package login_system;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import login_system.dto.Student;
import login_system.dto.UserStore;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	PrintWriter out = response.getWriter();
    	
    	String username = request.getParameter("username");
        String password = request.getParameter("password");

        Student student = UserStore.validateUser(username, password);

        if (student != null) {
            HttpSession session = request.getSession();
            session.setAttribute("student", student);

            response.sendRedirect("dashboard");
        } else {
            out.println("<h1>Login Failed!</h1>");
            out.println("<p>Invalid username or password. Try again.</p>");
            out.println("<a href='login.html'>Back to Login</a>");
        }
    }
}

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
    	
    	
    	String username = request.getParameter("username");
        String password = request.getParameter("password");

        Student student = UserStore.validateUser(username, password);

        if (student != null) {
            HttpSession session = request.getSession();
            session.setAttribute("username", student.getUsername());

            request.getRequestDispatcher("dashboard").forward(request, response);
        } else {
        	request.setAttribute("error", "Login is not successful.");
            request.setAttribute("message", "Login");
            request.setAttribute("link", "login.jsp");
            
            request.getRequestDispatcher("error.jsp").forward(request, response);
    }
    }
}

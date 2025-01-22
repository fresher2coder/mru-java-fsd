package login_system;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	PrintWriter out = response.getWriter();
    	HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        request.setAttribute("success", "Sorry to see you leave. Login to enjoy the features");
        request.setAttribute("message", "Login");
        request.setAttribute("link", "login.jsp");
        
        request.getRequestDispatcher("success.jsp").forward(request, response);

    }
}

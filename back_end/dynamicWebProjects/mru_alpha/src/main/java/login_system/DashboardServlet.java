package login_system;

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

@WebServlet("/dashboard")
public class DashboardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession(false);
		String username = (String)session.getAttribute("username");
		// Check if the session or student attribute exists
		if (session == null || username == null) {
			response.sendRedirect("login.html");
			return;
		}

		// Pass the student object to the JSP
		Student student = UserStore.getStudent(username);
		session.setAttribute("student", student);
		response.sendRedirect("dashboard.jsp");
	}
}

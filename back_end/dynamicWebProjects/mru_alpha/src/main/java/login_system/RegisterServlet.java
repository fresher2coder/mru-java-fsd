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
            request.setAttribute("success", "Registration is successful");
            request.setAttribute("message", "Login");
            request.setAttribute("link", "login.jsp");
            
            request.getRequestDispatcher("success.jsp").forward(request, response);
        } else {
        	request.setAttribute("error", "Registration is not successful. Username is already Exist");
            request.setAttribute("message", "Register");
            request.setAttribute("link", "register.jsp");
            
            request.getRequestDispatcher("error.jsp").forward(request, response);
 
        }
    }
}

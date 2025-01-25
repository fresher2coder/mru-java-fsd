package login_system;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import login_system.dto.Student;
import login_system.dto.UserStore;
import login_system.dto.Vehicle;
import login_system.dto.VehicleStore;

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
        
        String ownerName = request.getParameter("ownerName");
        String vehicleType = request.getParameter("vehicleType");
        String registrationNumber = request.getParameter("registrationNumber");
        String color = request.getParameter("color");

        Vehicle vehicle = new Vehicle(username, password, ownerName, vehicleType, registrationNumber, color);
        
        
        if (VehicleStore.registerStudent(vehicle)) {
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

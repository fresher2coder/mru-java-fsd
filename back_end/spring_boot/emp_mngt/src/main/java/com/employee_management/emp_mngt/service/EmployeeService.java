package com.employee_management.emp_mngt.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmployeeService {

    private Map<String, String> employeeRoles;

    public EmployeeService() {
        System.out.println("1️⃣ Constructor: EmployeeService bean is created.");
    }

    public String getEmployeeRole(String empId) {
        return employeeRoles.getOrDefault(empId, "Guest");
    }

    public Map<String, String> getAllEmployees() {
        return employeeRoles;
    }

    public String addEmployee(String empId, String role) {
        if (employeeRoles.containsKey(empId)) {
            return "❌ Employee ID " + empId + " already exists.";
        } else {
            employeeRoles.put(empId, role);
            return "✅ Employee " + empId + " added with role: " + role;
        }
    }

    public String updateEmployeeRole(String empId, String newRole) {
        if (employeeRoles.containsKey(empId)) {
            employeeRoles.put(empId, newRole);
            return "✅ Employee " + empId + " role updated to: " + newRole;
        } else {
            return "❌ Employee ID " + empId + " not found.";
        }
    }

    public String deleteEmployee(String empId) {
        if (employeeRoles.remove(empId) != null) {
            return "✅ Employee " + empId + " deleted.";
        } else {
            return "❌ Employee ID " + empId + " not found.";
        }
    }

}

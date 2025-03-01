package com.employee_management.emp_mngt.controller;

import org.springframework.web.bind.annotation.*;

import com.employee_management.emp_mngt.service.EmployeeService;

import java.util.Map;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Fetch an employee's role - GET -- http://localhost:8080/employees/role/E101
    @GetMapping("/role/{empId}")
    public String getEmployeeRole(@PathVariable String empId) {
        return "Employee Role: " + employeeService.getEmployeeRole(empId);
    }

    // Fetch all employees - GET
    // http://localhost:8080/employees/list
    @GetMapping("/list")
    public Map<String, String> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // Add a new employee - POST
    // http://localhost:8080/employees/add?empId=E105&role=Analyst
    @PostMapping("/add")
    public String addEmployee(@RequestParam String empId, @RequestParam String role) {
        return employeeService.addEmployee(empId, role);
    }

    // Update employee role - PUT
    // http://localhost:8080/employees/update/E102?newRole=Team Lead
    @PutMapping("/update/{empId}")
    public String updateEmployeeRole(@PathVariable String empId, @RequestParam String newRole) {
        return employeeService.updateEmployeeRole(empId, newRole);
    }

    // Delete employee - DELETE
    // http:// localhost:8080/employees/delete/E103
    @DeleteMapping("/delete/{empId}")
    public String deleteEmployee(@PathVariable String empId) {
        return employeeService.deleteEmployee(empId);
    }
}

package com.example.exception_handling.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import com.example.exception_handling.exceptions.DuplicateEmailException;
import com.example.exception_handling.exceptions.EmployeeNotFoundException;
import com.example.exception_handling.model.Employee;

import java.util.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final Map<Integer, Employee> employeeDatabase = new HashMap<>();
    private int employeeIdCounter = 1;

    @PostMapping("/add")
    public Employee addEmployee(@Valid @RequestBody Employee employee) {
        // Check for duplicate email
        for (Employee emp : employeeDatabase.values()) {
            if (emp.getEmail().equalsIgnoreCase(employee.getEmail())) {
                throw new DuplicateEmailException("Email " + employee.getEmail() + " is already in use.");
            }
        }
        employee.setId(employeeIdCounter++);
        employeeDatabase.put(employee.getId(), employee);
        return employee;
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable int id) {
        Employee employee = employeeDatabase.get(id);
        if (employee == null) {
            throw new EmployeeNotFoundException("Employee with ID " + id + " not found.");
        }
        return employee;
    }
}

package com.task_manager.task_mngt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.task_manager.task_mngt.model.Employee;
import com.task_manager.task_mngt.model.Task;
import com.task_manager.task_mngt.service.EmployeeTaskManager;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeTaskController {

    @Autowired
    private EmployeeTaskManager taskManagerService;

    // Register a new employee
    // POST http:// localhost:8080/employees/register?name=Dineshkumar
    // POST http:// localhost:8080/employees/register?name=Divya Dineshkumar

    @PostMapping("/register")
    public Employee registerEmployee(@RequestParam String name) {
        return taskManagerService.registerEmployee(name);
    }

    // Assign a task to an employee
    @PostMapping("/{employeeId}/{description}/")
    // POST http:// localhost:8080/employees/e1a2b3c4-d567-8901/assign-task
    // POST http:// localhost:8080/employees/a2b3c4d5-e678-9012/assign-task

    public Task assignTask(@PathVariable String employeeId, @PathVariable String description) {
        return taskManagerService.assignTask(employeeId, description);
    }

    // Complete a task
    @PutMapping("/complete-task/{taskId}")
    // PUT http:// localhost:8080/employees/complete-task/task-12345
    public String completeTask(@PathVariable String taskId) {
        return taskManagerService.completeTask(taskId);
    }

    // Get all pending tasks
    @GetMapping("/tasks/pending")
    // GET http:// localhost:8080/employees/tasks/pending

    public Collection<Task> getPendingTasks() {
        return taskManagerService.getPendingTasks();
    }

    // Get all completed tasks
    // GET http:// localhost:8080/employees/tasks/completed

    @GetMapping("/tasks/completed")
    public List<Task> getCompletedTasks() {
        return taskManagerService.getCompletedTasks();
    }
}

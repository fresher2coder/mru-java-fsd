package com.task_manager.task_mngt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.task_manager.task_mngt.model.Employee;
import com.task_manager.task_mngt.model.Task;
import com.task_manager.task_mngt.model.TaskPriority;
import com.task_manager.task_mngt.service.EmployeeTaskManager;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeTaskController {

    @Autowired
    private EmployeeTaskManager taskManagerService;

    @GetMapping
    public List<Employee> getEmployees() {
        return taskManagerService.getEmployees();
    }

    @PostMapping("/register")
    public Employee registerEmployee(@RequestParam String name, @RequestParam String email,
            @RequestParam String phoneNumber) {
        return taskManagerService.registerEmployee(name, email, phoneNumber);
    }

    @PostMapping("/{employeeId}/assign-task")
    public Task assignTask(@PathVariable String employeeId,
            @RequestParam TaskPriority priority,
            @RequestParam String dueDate) {
        LocalDateTime due = LocalDateTime.parse(dueDate);
        return taskManagerService.assignTask(employeeId, priority, due);
    }

    @PutMapping("/complete-task/{taskId}")
    public String completeTask(@PathVariable String taskId) {
        return taskManagerService.completeTask(taskId);
    }

    @GetMapping("/tasks/pending")
    public Collection<Task> getPendingTasks() {
        return taskManagerService.getPendingTasks();
    }

    @GetMapping("/tasks/completed")
    public List<Task> getCompletedTasks() {
        return taskManagerService.getCompletedTasks();
    }
}

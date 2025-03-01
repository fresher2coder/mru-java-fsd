package com.task_manager.task_mngt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.task_manager.task_mngt.model.Employee;
import com.task_manager.task_mngt.model.Task;

import java.util.*;

@Service
public class EmployeeTaskManager {

    private ApplicationContext context; // To manually get prototype beans

    public EmployeeTaskManager(ApplicationContext context) {
        this.context = context;
    }

    private final Map<String, Employee> employees = new HashMap<>();
    private final Map<String, Task> assignedTasks = new HashMap<>();
    private final List<Task> completedTasks = new ArrayList<>();

    // Register a new employee
    public Employee registerEmployee(String name) {
        Employee employee = context.getBean(Employee.class, name); // Fetch prototype bean
        employees.put(employee.getEmployeeId(), employee);
        return employee;
    }

    // Assign a new task to an employee
    public Task assignTask(String employeeId, String description) {
        if (!employees.containsKey(employeeId)) {
            throw new IllegalArgumentException("Employee not found!");
        }

        Task task = context.getBean(Task.class, description); // Get a new Task instance
        task.assignTo(employeeId);
        assignedTasks.put(task.getTaskId(), task);
        return task;
    }

    // Complete a task
    public String completeTask(String taskId) {
        if (!assignedTasks.containsKey(taskId)) {
            return "Task not found or already completed!";
        }

        Task task = assignedTasks.remove(taskId);
        task.markAsCompleted();
        completedTasks.add(task);
        return "✅ Task " + taskId + " marked as completed!";
    }

    // Get all pending tasks
    public Collection<Task> getPendingTasks() {
        return assignedTasks.values();
    }

    // Get all completed tasks
    public List<Task> getCompletedTasks() {
        return completedTasks;
    }
}

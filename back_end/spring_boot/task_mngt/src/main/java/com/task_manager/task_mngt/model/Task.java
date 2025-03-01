package com.task_manager.task_mngt.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

import java.util.UUID;

@Component
@Scope("prototype") // New task instance for every request
public class Task {
    private String taskId;
    private String description;
    private String assignedTo;
    private boolean isCompleted;

    public Task(String description) {
        this.description = description;
    }

    @PostConstruct
    public void initializeTask() { // Can be named anything meaningful
        this.taskId = UUID.randomUUID().toString(); // Generate Unique Task ID
        this.isCompleted = false;
    }

    public void assignTo(String employeeId) {
        this.assignedTo = employeeId;
    }

    public void markAsCompleted() {
        this.isCompleted = true;
    }

    public String getTaskId() {
        return taskId;
    }

    public String getDescription() {
        return description;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public boolean isCompleted() {
        return isCompleted;
    }
}

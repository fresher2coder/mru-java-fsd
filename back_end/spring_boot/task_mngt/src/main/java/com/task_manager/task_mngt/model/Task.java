package com.task_manager.task_mngt.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
@Scope("prototype") // New instance for each task
public class Task {
    private final String taskId;
    private final String description;
    private String assignedTo;
    private boolean isCompleted;
    private TaskPriority priority;
    private LocalDateTime dueDate;

    public Task() {
        this.taskId = UUID.randomUUID().toString();
        this.description = "New Task Assigned";
        this.isCompleted = false;
    }

    public void assignTo(String employeeId, TaskPriority priority, LocalDateTime dueDate) {
        this.assignedTo = employeeId;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    public void markAsCompleted() {
        this.isCompleted = true;
    }

    public boolean isOverdue() {
        return !isCompleted && dueDate.isBefore(LocalDateTime.now());
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

    public TaskPriority getPriority() {
        return priority;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }
}

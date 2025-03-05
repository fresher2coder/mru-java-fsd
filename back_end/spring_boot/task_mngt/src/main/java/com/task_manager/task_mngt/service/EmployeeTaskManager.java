package com.task_manager.task_mngt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.task_manager.task_mngt.model.Employee;
import com.task_manager.task_mngt.model.TaskPriority;
import com.task_manager.task_mngt.model.Task;

import java.time.LocalDateTime;
import java.util.*;

@Service
@Configuration
@EnableScheduling
public class EmployeeTaskManager {

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private WhatsAppService whatsAppService;

    @Autowired
    private ApplicationContext context;

    private final Map<String, Employee> employees = new HashMap<>();
    private final Map<String, Task> assignedTasks = new HashMap<>();
    private final List<Task> completedTasks = new ArrayList<>();

    public Employee registerEmployee(String name, String email, String phoneNumber) {
        System.out.println(phoneNumber);
        Employee employee = context.getBean(Employee.class, name, email, phoneNumber);
        employees.put(employee.getEmployeeId(), employee);
        return employee;
    }

    public Task assignTask(String employeeId, TaskPriority priority, LocalDateTime dueDate) {
        if (!employees.containsKey(employeeId)) {
            throw new IllegalArgumentException("Employee not found!");
        }

        Task task = context.getBean(Task.class);
        task.assignTo(employeeId, priority, dueDate);
        assignedTasks.put(task.getTaskId(), task);
        // checkOverdueTasks();
        return task;
    }

    public String completeTask(String taskId) {
        if (!assignedTasks.containsKey(taskId)) {
            return "Task not found or already completed!";
        }

        Task task = assignedTasks.remove(taskId);
        task.markAsCompleted();
        completedTasks.add(task);
        return "✅ Task " + taskId + " marked as completed!";
    }

    public Collection<Task> getPendingTasks() {
        return assignedTasks.values();
    }

    public List<Task> getCompletedTasks() {
        return completedTasks;
    }

    // 🕒 Check overdue tasks every 30 seconds & send email
    @Scheduled(fixedRate = 30000)
    public void checkOverdueTasks() {
        System.out.println("⏰ Checking for overdue tasks...");
        for (Task task : assignedTasks.values()) {
            if (task.isOverdue()) {
                Employee employee = employees.get(task.getAssignedTo());
                String alertMessage = "⚠️ Task Overdue: " + task.getTaskId() +
                        "\nPriority: " + task.getPriority() +
                        "\nDue Date: " + task.getDueDate();

                // emailService.sendEmail(employee.getEmail(), "Overdue Task Alert",
                // alertMessage);
                // System.out.println("📧 Email sent to " + employee.getEmail());

                // Send SMS
                // smsService.sendSms(employee.getPhoneNumber(), alertMessage);
                // System.out.println("📲 SMS sent to " + employee.getPhoneNumber());

                // Send WhatsApp Notification
                whatsAppService.sendWhatsAppMessage(employee.getPhoneNumber(),
                        task.getTaskId(),
                        task.getPriority().toString(),
                        task.getDueDate().toString());
                System.out.println("📢 WhatsApp Notification sent to " + employee.getPhoneNumber());

            }
        }
    }

    public List<Employee> getEmployees() {
        return new ArrayList<>(employees.values());
    }

}

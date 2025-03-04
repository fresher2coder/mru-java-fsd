package com.task_manager.task_mngt.model;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.Data;

@Data
@Component
@Scope("prototype")
public class Employee {

    private String employeeId;
    private String name;
    private String email; // New field for email
    private String phoneNumber;

    @Autowired
    public Employee(String name, String email, String phoneNumber) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        // this.employeeId = UUID.randomUUID().toString();
    }

    @PostConstruct
    public void generateEmployeeId() {
        this.employeeId = UUID.randomUUID().toString();
    }
}

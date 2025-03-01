package com.task_manager.task_mngt.model;

import java.util.UUID;

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

    public Employee(String name) {
        this.name = name;
    }

    @PostConstruct
    public void generateEmployeeId() {
        this.employeeId = UUID.randomUUID().toString();
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeId='" + employeeId + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}

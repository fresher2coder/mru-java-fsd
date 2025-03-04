package com.example.noifications.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.noifications.model.Employee;
import com.example.noifications.service.MailService;
import com.example.noifications.service.SmsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/notifications")
@Configuration
@EnableScheduling
public class NotificationController {

    @Autowired
    Employee emp;

    @Autowired
    MailService mailService;

    @Autowired
    SmsService smsService;

    @PostMapping("/register")
    public Employee registerEmployee(@RequestBody Employee employee) {

        this.emp = employee;
        return employee;
    }

    @PostMapping("/send/email")
    public String sendNotification() {

        String emailBody = "Hi Welcome to Spring Emailer";
        String subject = "Spring Mail Service";

        mailService.sendEmail(emp.getEmail(), subject, emailBody);

        return "Email send to " + emp.getName();

    }

    @PostMapping("/send/sms")
    public String sendSms() {

        String smsBody = "Hi Welcome to Spring SMS Service";

        smsService.sendSms(emp.getPhone(), smsBody);

        return "SMS send to " + emp.getName();

    }

    // @Scheduled(fixedRate = 30000)
    public String scheduleNotification() {

        String emailBody = "Hi Welcome to Spring Emailer";
        String subject = "Spring Mail Service";

        mailService.sendEmail(emp.getEmail(), subject, emailBody);

        return "Email send to " + emp.getName();

    }
}

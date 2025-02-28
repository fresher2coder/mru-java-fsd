package com.user_mngt.registration.service;

import org.springframework.stereotype.Service;

@Service
public class EmailNotification implements Notification {

    @Override
    public String getNotification(String uname) {
        return "Email Notification sent to " + uname;
    }

    @Override
    public String getNotificationType() {
        return "EMAIL";
    }

}

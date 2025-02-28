package com.user_mngt.registration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.user_mngt.registration.factory.NotificationFactory;

@Service
public class UserRegistration {

    @Autowired
    NotificationFactory notification;

    public UserRegistration() {
        System.out.println("UserRegistration bean created");
    }

    public String registerUser(String uname, String notificationType) {

        return uname + " is registered successfully.\n"
                + notification.getInstance(notificationType).getNotification(uname);
    }
}

/*
 * Bean creation
 * 
 * Service - app logic
 * Component - generic
 * Repository - db
 * 
 */

package com.user_mngt.registration.service;

import org.springframework.stereotype.Service;

@Service
public class SmsNotification implements Notification {

    @Override
    public String getNotification(String uname) {
        return "SMS Notification sent to " + uname;
    }

    @Override
    public String getNotificationType() {
        return "SMS";
    }

}

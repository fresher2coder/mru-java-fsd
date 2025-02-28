package com.user_mngt.registration.factory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.user_mngt.registration.service.Notification;

@Component
public class NotificationFactory {

    private Map<String, Notification> notificationMap = new HashMap<>();

    @Autowired
    public NotificationFactory(List<Notification> notifications) {
        notifications.forEach(notification -> notificationMap.put(notification.getNotificationType(), notification));
    }

    public Notification getInstance(String notificationType) {

        return notificationMap.get(notificationType.toUpperCase());
    }
}

/*
 * 
 * notificationMap
 * 
 * "EMAIL" -> new EmailNotification()
 * "SMS" -> new SmsNotification()
 * "WHATSAPP" -> new WhatsappNotification()
 * 
 */

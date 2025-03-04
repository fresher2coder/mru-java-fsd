package com.example.noifications.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class SmsService {

    @Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    @Value("${twilio.phoneNumber}")
    private String twilioPhoneNumber;

    public void sendSms(String to, String body) {
        Twilio.init(accountSid, authToken);

        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(to), // Recipient's phone number
                new com.twilio.type.PhoneNumber(twilioPhoneNumber), // Twilio number
                body).create();

        System.out.println("📲 SMS sent to: " + to);
    }
}

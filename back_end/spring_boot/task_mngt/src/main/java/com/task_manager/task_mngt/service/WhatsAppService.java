package com.task_manager.task_mngt.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class WhatsAppService {

    @Value("${whatsapp.api.url}") // Base API URL (e.g., "https://graph.facebook.com/v18.0/")
    private String apiUrl;

    @Value("${whatsapp.phone.number.id}") // WhatsApp Business Phone ID
    private String phoneNumberId;

    @Value("${whatsapp.token}") // Meta API Access Token
    private String accessToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendWhatsAppMessage(String to, String taskId, String priority, String dueDate) {
        String url = apiUrl + phoneNumberId + "/messages"; // Final API endpoint

        String message = "⚠️ Task Overdue: " + taskId +
                "\nPriority: " + priority +
                "\nDue Date: " + dueDate +
                "\nPlease complete it ASAP.";

        System.out.println(message);
        // Create JSON request body
        Map<String, Object> requestBody = Map.of(
                "messaging_product", "whatsapp",
                "recipient_type", "individual",
                "to", to,
                "type", "text",
                "text", Map.of("body", message));

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("📢 WhatsApp Message Sent Successfully: " + response.getBody());
            } else {
                System.out.println("⚠️ WhatsApp API responded with status " + response.getStatusCode() + ": "
                        + response.getBody());
            }
        } catch (Exception e) {
            System.out.println("❌ Failed to send WhatsApp message: " + e.getMessage());
        }
    }
}
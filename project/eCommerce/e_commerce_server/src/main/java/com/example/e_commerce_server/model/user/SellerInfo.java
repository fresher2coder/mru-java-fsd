package com.example.e_commerce_server.model.user;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
public class SellerInfo {

    @NotBlank(message = "Business name is required")
    private String businessName; // Changed from storeName to match JSON

    @NotBlank(message = "GST number is required")
    @Pattern(regexp = "\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}\\d{1}[A-Z]{1}\\d{1}", message = "Invalid GST number format")
    private String gstNumber;

    @NotBlank(message = "Bank details are required")
    private BankDetails bankDetails; // Embedded object
}

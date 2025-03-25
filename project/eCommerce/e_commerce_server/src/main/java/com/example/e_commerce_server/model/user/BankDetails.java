package com.example.e_commerce_server.model.user;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
public class BankDetails {

    @NotBlank(message = "Account number is required")
    @Pattern(regexp = "\\d{9,18}", message = "Invalid account number format")
    private String accountNumber;

    @NotBlank(message = "IFSC code is required")
    @Pattern(regexp = "^[A-Z]{4}0[A-Z0-9]{6}$", message = "Invalid IFSC code format")
    private String ifscCode;

    @NotBlank(message = "Bank name is required")
    private String bankName;
}

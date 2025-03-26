package com.example.e_commerce_server.model.product;

import java.math.BigDecimal;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Discount {
    private int percentage;
    private BigDecimal finalPrice;
}

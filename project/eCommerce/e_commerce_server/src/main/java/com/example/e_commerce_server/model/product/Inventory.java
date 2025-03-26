package com.example.e_commerce_server.model.product;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {
    private int stock;
    private int threshold;
}

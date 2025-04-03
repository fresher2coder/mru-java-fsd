package com.example.e_commerce_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@EnableMethodSecurity
@SpringBootApplication
public class ECommerceServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceServerApplication.class, args);
	}

}

package com.example.mongo_integration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()// ❌ No authentication required for any endpoint
                )
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(Customizer.withDefaults()); // You can remove this if you don't need Basic Auth

        // http
        // .authorizeHttpRequests(auth -> auth
        // .requestMatchers("/api/users/register", "/api/users/login").permitAll() //
        // Public endpoints
        // .anyRequest().authenticated() // Other endpoints require authentication
        // )
        // .csrf(AbstractHttpConfigurer::disable) // ❌ Disable CSRF for REST API
        // .httpBasic(Customizer.withDefaults()); // Use Basic Authentication (Change to
        // JWT later)

        return http.build();
    }
}

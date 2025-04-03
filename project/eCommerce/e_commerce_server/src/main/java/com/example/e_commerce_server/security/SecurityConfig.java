package com.example.e_commerce_server.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
                        .requestMatchers("/api/user/register", "/api/user/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers("/api/users/all-users").hasRole("ADMIN") // Only Admins can get all users
                        .requestMatchers("/api/product/**").hasAnyRole("SELLER", "ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
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

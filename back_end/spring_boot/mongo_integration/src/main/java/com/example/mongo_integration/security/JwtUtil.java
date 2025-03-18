package com.example.mongo_integration.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private final SecretKey key;

    // ✅ Inject secret key from application.properties or environment variable
    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username) // New method for setting subject
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key) // No need to specify algorithm (HS256 is default)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(key) // New method for verification
                .build()
                .parseSignedClaims(token) // Updated method for parsing
                .getPayload()
                .getSubject(); // Extracts "sub" (subject)
    }

    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser()
                .verifyWith(key) // New method for verification
                .build()
                .parseSignedClaims(token) // Updated method for parsing
                .getPayload()
                .getExpiration()
                .before(new Date());
    }

}

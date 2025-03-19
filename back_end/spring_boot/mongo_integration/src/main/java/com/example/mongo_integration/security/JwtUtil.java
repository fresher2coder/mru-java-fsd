package com.example.mongo_integration.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private SecretKey key;

    // ✅ Inject secret key from application.properties
    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    // ✅ Validate the key after dependency injection
    @PostConstruct
    public void validateKey() {
        if (key == null) {
            throw new IllegalStateException("JWT secret key is not initialized!");
        }
        logger.info("JWT Secret Key successfully initialized.");
    }

    // ✅ Generate JWT Token
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    // ✅ Extract Username (Optional to prevent exceptions)
    public Optional<String> extractUsername(String token) {
        try {
            return Optional.ofNullable(parseClaims(token).getSubject());
        } catch (JwtException e) {
            logger.warn("Failed to extract username: {}", e.getMessage());
            return Optional.empty();
        }
    }

    // ✅ Validate Token
    public boolean validateToken(String token, String username) {
        try {
            Claims claims = parseClaims(token);
            String extractedUsername = claims.getSubject();
            return extractedUsername.equals(username) && !isTokenExpired(claims);
        } catch (ExpiredJwtException e) {
            logger.warn("JWT Token is expired: {}", e.getMessage());
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            logger.warn("Invalid JWT Token: {}", e.getMessage());
            return false;
        }
    }

    // ✅ Check Token Expiration
    private boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    // ✅ Common Method to Parse Claims (Avoid Code Duplication)
    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}

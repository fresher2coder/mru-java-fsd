package com.example.exception_handling.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle Employee Not Found
    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEmployeeNotFound(EmployeeNotFoundException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Employee Not Found");
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    // Handle Duplicate Email Exception
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateEmail(DuplicateEmailException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Duplicate Email");
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    // Handle Validation Errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Handle All Other Exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGlobalException(Exception ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Internal Server Error");
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

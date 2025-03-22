package com.example.handle_multi_media.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.handle_multi_media.model.FileDocument;
import com.example.handle_multi_media.model.User;
import com.example.handle_multi_media.service.FileService;

import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
@RestController
@RequestMapping("/api/files")
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileDocument> uploadFile(
            @RequestPart("user") User user, // JSON Data
            @RequestParam("file") MultipartFile file // Profile Picture
    ) {
        Logger logger = LoggerFactory.getLogger(FileController.class);
        try {

            // Log user details
            logger.info("Received Upload Request:");
            logger.info("User Name: {}", user.getName());
            logger.info("User Email: {}", user.getEmail());

            // Log file details
            logger.info("Uploaded File: {}", file.getOriginalFilename());
            logger.info("File Size: {} bytes", file.getSize());
            logger.info("File Type: {}", file.getContentType());

            FileDocument savedFile = fileService.saveFile(user, file);
            return ResponseEntity.ok(savedFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public List<FileDocument> getAllFiles() {
        return fileService.getAllFiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileDocument> getFile(@PathVariable String id) {
        return fileService.getFileById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable String id) {
        return fileService.deleteFile(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}

package com.example.handle_multi_media.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.handle_multi_media.model.FileDocument;
import com.example.handle_multi_media.model.User;
import com.example.handle_multi_media.repository.FileRepository;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileService {
    private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    private final FileRepository fileRepository;
    // Directory inside static folder
    private final String UPLOAD_DIR = "uploads/";
    private final String STATIC_PATH = "src/main/resources/static/" + UPLOAD_DIR;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileDocument saveFile(User user, MultipartFile file) throws Exception {
        logger.info("Received upload request for User: {} - {}", user.getName(), user.getEmail());

        // Create uploads directory if it doesn't exist
        Path uploadDirPath = Path.of(STATIC_PATH);
        if (!Files.exists(uploadDirPath)) {
            Files.createDirectories(uploadDirPath);
            logger.info("Created directory: {}", uploadDirPath);
        }

        // Generate unique file name
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Path.of(STATIC_PATH + fileName);

        // Copy file to the directory
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        logger.info("File saved successfully: Name={}, Type={}, Path={}", fileName, file.getContentType(), filePath);

        // Store relative path in DB (for frontend access)
        FileDocument fileDocument = new FileDocument(fileName, file.getContentType(), UPLOAD_DIR + fileName,
                user.getName(), user.getEmail());

        FileDocument savedFile = fileRepository.save(fileDocument);
        logger.info("File document saved to DB: ID={}, User={}", savedFile.getId(), savedFile.getUserName());

        return savedFile;
    }

    public List<FileDocument> getAllFiles() {
        List<FileDocument> files = fileRepository.findAll();
        logger.info("Fetched {} files from database", files.size());
        return files;
    }

    public Optional<FileDocument> getFileById(String id) {
        Optional<FileDocument> fileDocument = fileRepository.findById(id);
        if (fileDocument.isPresent()) {
            logger.info("File found: {}", fileDocument.get().getFileName());
        } else {
            logger.warn("File not found for ID: {}", id);
        }
        return fileDocument;
    }

    public boolean deleteFile(String id) {
        if (fileRepository.existsById(id)) {
            fileRepository.deleteById(id);
            logger.info("File deleted with ID: {}", id);
            return true;
        }
        logger.warn("File not found for deletion: ID={}", id);
        return false;
    }
}

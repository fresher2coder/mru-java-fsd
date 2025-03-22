package com.example.handle_multi_media.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "files")
public class FileDocument {
    @Id
    private String id;
    private String fileName;
    private String fileType;
    private String filePath;
    private String userName;
    private String userEmail;

    // Constructor
    public FileDocument(String fileName, String fileType, String filePath, String userName, String userEmail) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.filePath = filePath;
        this.userName = userName;
        this.userEmail = userEmail;
    }

}

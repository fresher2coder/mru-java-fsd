package com.example.handle_multi_media.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.handle_multi_media.model.FileDocument;

@Repository
public interface FileRepository extends MongoRepository<FileDocument, String> {
}

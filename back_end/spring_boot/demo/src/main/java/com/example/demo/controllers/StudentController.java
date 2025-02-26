package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.example.demo.models.Student;

@RestController
@RequestMapping("/students")
public class StudentController {

    //studentMap, counter
    Map<Integer, Student> students = new ConcurrentHashMap<>();
    AtomicInteger counter = new AtomicInteger(1);

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        int id = counter.getAndIncrement();
        student.setId(id);
        students.put(id, student);

        return student;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return new ArrayList<>(students.values());
    }
    
}

/*{
    * 1: studObj1
    * 2: studObj2
 * }
 */

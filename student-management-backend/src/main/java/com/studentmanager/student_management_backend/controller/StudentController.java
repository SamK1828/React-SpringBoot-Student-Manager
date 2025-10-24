package com.studentmanager.student_management_backend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanager.student_management_backend.entity.Student;
import com.studentmanager.student_management_backend.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173") // allow Vite dev server
public class StudentController {
  private final StudentService service;

  public StudentController(StudentService service) {
    this.service = service;
  }

  @GetMapping
  public List<Student> getAll() {
    return service.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Student> getById(@PathVariable Long id) {
    return service.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Student> create(@RequestBody Student student) {
    Student saved = service.save(student);
    return ResponseEntity.created(URI.create("/api/students/" + saved.getId())).body(saved);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student student) {
    try {
      Student updated = service.update(id, student);
      return ResponseEntity.ok(updated);
    } catch (RuntimeException ex) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    service.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/search")
  public List<Student> searchStudents(@RequestParam String name) {
    return service.searchByName(name);
  }
}

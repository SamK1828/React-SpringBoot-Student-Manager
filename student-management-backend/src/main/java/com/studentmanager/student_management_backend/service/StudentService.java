package com.studentmanager.student_management_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.studentmanager.student_management_backend.entity.Student;
import com.studentmanager.student_management_backend.repository.StudentRepository;


@Service
public class StudentService {
  private final StudentRepository repo;

  public StudentService(StudentRepository repo) {
    this.repo = repo;
  }

  public List<Student> findAll() {
    return repo.findAll();
  }

  public Optional<Student> findById(Long id) {
    return repo.findById(id);
  }

  public Student save(Student s) {
    return repo.save(s);
  }

  public Student update(Long id, Student s) {
    return repo.findById(id).map(existing -> {
      existing.setName(s.getName());
      existing.setEmail(s.getEmail());
      existing.setCourse(s.getCourse());
      existing.setMarks(s.getMarks());
      return repo.save(existing);
    }).orElseThrow(() -> new RuntimeException("Student not found: " + id));
  }

  public void delete(Long id) {
    repo.deleteById(id);
  }
}

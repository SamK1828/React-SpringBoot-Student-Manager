package com.studentmanager.student_management_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentmanager.student_management_backend.entity.Student;


public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByNameContainingIgnoreCase(String name);
}

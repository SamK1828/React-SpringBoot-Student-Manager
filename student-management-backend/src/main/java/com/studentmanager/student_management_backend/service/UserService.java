package com.studentmanager.student_management_backend.service;



import com.studentmanager.student_management_backend.entity.User;
import com.studentmanager.student_management_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String email, String password ,String role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        User user = new User(email, passwordEncoder.encode(password),role );
        return userRepository.save(user);
    }
}

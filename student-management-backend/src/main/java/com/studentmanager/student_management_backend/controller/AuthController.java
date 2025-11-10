package com.studentmanager.student_management_backend.controller;

import com.studentmanager.student_management_backend.entity.Role;
import com.studentmanager.student_management_backend.entity.User;
import com.studentmanager.student_management_backend.repository.UserRepository;
import com.studentmanager.student_management_backend.service.JwtService;

// import io.jsonwebtoken.Claims;

// // import com.studentmanager.student_management_backend.security.JwtService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.*;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "http://localhost:3000")
// public class AuthController {

//     @Autowired
//     private AuthenticationManager authenticationManager;
//     @Autowired
//     private UserRepository userRepository;
//     @Autowired
//     private PasswordEncoder passwordEncoder;
//     @Autowired
//     private JwtService jwtService;
//     @Autowired
//     private UserDetailsService userDetailsService;

//     // @PostMapping("/register")
//     // public Map<String,String> register(@RequestBody User request) {
//     // if (userRepository.findByEmail(request.getEmail()).isPresent()) {
//     // return Map.of("error","Email already registered");
//     // }
//     // request.setPassword(passwordEncoder.encode(request.getPassword()));
//     // request.setRole("USER");
//     // userRepository.save(request);
//     // return Map.of("message","User registered successfully");
//     // }

//     @PostMapping("/register")
//     public ResponseEntity<String> registerUser(@RequestBody User user) {
//         if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//             return ResponseEntity.ok("Email already registered");
//         }
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
//         user.setRole("ROLE_USER"); // default role
//         userRepository.save(user);
//         return ResponseEntity.ok("User registered successfully");
//     }

//     @PostMapping("/login")

//     public Map<String, Object> login(@RequestBody User request) {
//         try {
//             Authentication auth = authenticationManager.authenticate(
//                     new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
//         } catch (BadCredentialsException ex) {
//             return Map.of("error", "Invalid credentials");
//         }
//         // load UserDetails and generate token
//         UserDetails ud = userDetailsService.loadUserByUsername(request.getEmail());
//         String token = jwtService.generateToken(ud);
//         return Map.of("token", token, "expiresInMs", jwtService.extractClaim(token, Claims::getExpiration).getTime());
//     }
// }

// package com.example.securitydemo.controller;

// import com.example.securitydemo.entity.User;
// import com.example.securitydemo.repository.UserRepository;
// import com.example.securitydemo.service.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authManager,
                          UserRepository userRepo,
                          PasswordEncoder encoder,
                          JwtService jwtService) {
        this.authManager = authManager;
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    // ---------- REGISTER ----------
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");
        String roleStr = req.getOrDefault("role", "USER");
        Role role = Role.valueOf(roleStr.toUpperCase());

        if (userRepo.findByEmail(email).isPresent()) {
            return Map.of("message", "User already exists");
        }

        User user = new User(email, encoder.encode(password), role);
        userRepo.save(user);
        String token = jwtService.generateToken(email, role.name());

        return Map.of("message", "User registered successfully", "token", token,"role", user.getRole());
    }

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String password = req.get("password");

        authManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        User user = userRepo.findByEmail(email).orElseThrow();
        String token = jwtService.generateToken(email, user.getRole().name());

        return Map.of("message", "Login successful", "token", token, "role", user.getRole());
    }
}
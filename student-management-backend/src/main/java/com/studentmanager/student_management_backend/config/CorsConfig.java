package com.studentmanager.student_management_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ Allow requests from your React app
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));

        // ✅ Allow common methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ✅ Allow headers required for JWT
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

        // ✅ Allow sending credentials (cookies / auth header)
        config.setAllowCredentials(true);

        // ✅ Register CORS settings for all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}

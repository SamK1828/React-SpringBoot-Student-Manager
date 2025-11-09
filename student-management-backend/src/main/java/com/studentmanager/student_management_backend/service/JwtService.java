package com.studentmanager.student_management_backend.service;

// import io.jsonwebtoken.*;
// import io.jsonwebtoken.io.Decoders;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Service;

// import java.security.Key;
// import java.util.Date;
// import java.util.Map;
// import java.util.function.Function;

// @Service
// public class JwtService {

//     @Value("${jwt.secret}")
//     private String secret; // from application.properties

//     @Value("${jwt.expiration-ms}")
//     private long expirationMs;

//     private Key getSigningKey() {
//         // If secret is base64-encoded, use Decoders.BASE64.decode(secret)
//         // If you stored raw text, use secret.getBytes(StandardCharsets.UTF_8)
//         byte[] keyBytes;
//         try {
//             keyBytes = Decoders.BASE64.decode(secret);
//         } catch (Exception e) {
//             keyBytes = secret.getBytes();
//         }
//         return Keys.hmacShaKeyFor(keyBytes);
//     }

//     public String generateToken(UserDetails userDetails, Map<String, Object> extraClaims) {
//         long now = System.currentTimeMillis();
//         return Jwts.builder()
//                 .setClaims(extraClaims)
//                 .setSubject(userDetails.getUsername())
//                 .setIssuedAt(new Date(now))
//                 .setExpiration(new Date(now + expirationMs))
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     public String generateToken(UserDetails userDetails) {
//         return generateToken(userDetails, Map.of());
//     }

//     public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//         final Claims claims = parseToken(token);
//         return claimsResolver.apply(claims);
//     }

//     public String extractUsername(String token) {
//         return extractClaim(token, Claims::getSubject);
//     }

//     private Claims parseToken(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     public boolean isTokenValid(String token, UserDetails userDetails) {
//         final String username = extractUsername(token);
//         return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
//     }

//     private boolean isTokenExpired(String token) {
//         Date exp = extractClaim(token, Claims::getExpiration);
//         return exp.before(new Date());
//     }
// }


// package com.example.securitydemo.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    private static final String SECRET = "supersecretkeythatshouldbeatleast32characterslong";

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String username, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token) {
        return extractAllClaims(token).getExpiration().after(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
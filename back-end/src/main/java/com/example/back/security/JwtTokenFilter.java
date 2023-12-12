package com.example.back.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static javax.crypto.Cipher.SECRET_KEY;

public class JwtTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request); // Извлечение токена из запроса

        if (token != null && validateToken(token)) {
            Authentication auth = getAuthentication(token); // Получение аутентификации из токена

            if (auth != null) {
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // Удаление "Bearer " из строки заголовка
        }
        return null;
    }


    private Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser().setSigningKey(String.valueOf(SECRET_KEY)).parseClaimsJws(token).getBody();

        // Извлечение информации из токена, например, username, roles и других данных
        String username = claims.getSubject();

        if (username != null) {
            // Создание объекта аутентификации на основе информации из токена
            return new UsernamePasswordAuthenticationToken(username, null);
        }
        return null;
    }
    private boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(String.valueOf(SECRET_KEY)).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Обработка ошибок при проверке токена
            return false;
        }
    }
}

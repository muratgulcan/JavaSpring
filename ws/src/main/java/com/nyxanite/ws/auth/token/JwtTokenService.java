package com.nyxanite.ws.auth.token;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.auth.dto.Credentials;
import com.nyxanite.ws.user.User;

import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
@Primary
public class JwtTokenService implements TokenService {

    SecretKey key = Keys.hmacShaKeyFor("secret-must-be-at-least-thirty-two-chars".getBytes());

    @Override
    public Token createToken(User user, Credentials creds) {
        String token = Jwts.builder().subject(Long.toString(user.getId())).signWith(key).compact();
        return new Token("Bearer", token);
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if (authorizationHeader == null)
            return null;
        var token = authorizationHeader.split("Bearer ")[1];
        JwtParser parser = Jwts.parser().setSigningKey(key).build();
    }

}

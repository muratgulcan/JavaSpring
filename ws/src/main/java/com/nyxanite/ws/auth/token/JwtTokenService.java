package com.nyxanite.ws.auth.token;

import javax.crypto.SecretKey;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.auth.dto.Credentials;
import com.nyxanite.ws.user.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
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
        System.out.println("------------------------------TESTSETSETSETS");
        try {

            if (authorizationHeader == null)
                return null;
            var token = authorizationHeader.split("Bearer ")[1];
            JwtParser parser = Jwts.parser().verifyWith(key).build();
            System.out.println("--------------------------------" + parser);
            try {
                Jws<Claims> claims = parser.parseSignedClaims(token);
                long userId = Long.valueOf(claims.getPayload().getSubject());
                User user = new User();
                user.setId(userId);
                return user;
            } catch (JwtException e) {
                e.printStackTrace();
            }
            return null;
        } catch (Exception e) {
            System.out.println("------------------------------TESTSETSETSETS");

        }
        return null;
    }

}

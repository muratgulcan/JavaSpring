package com.nyxanite.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.auth.dto.AuthResponse;
import com.nyxanite.ws.auth.dto.Credentials;
import com.nyxanite.ws.auth.exception.AuthenticationException;
import com.nyxanite.ws.auth.token.Token;
import com.nyxanite.ws.auth.token.TokenService;
import com.nyxanite.ws.user.User;
import com.nyxanite.ws.user.UserService;
import com.nyxanite.ws.user.dto.UserDTO;

@Service
public class AuthService {

    @Autowired
    UserService userService;

    @Autowired
    TokenService tokenService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public AuthResponse authenticate(Credentials creds) {
        User inDB = userService.findByEmail(creds.email());
        if (inDB == null)
            throw new AuthenticationException();
        if (!passwordEncoder.matches(creds.password(), inDB.getPassword()))
            throw new AuthenticationException();
        Token token = tokenService.createToken(inDB, creds);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setUser(new UserDTO(inDB));
        return authResponse;
    }
}

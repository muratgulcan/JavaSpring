package com.nyxanite.ws.auth.token;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.auth.dto.Credentials;
import com.nyxanite.ws.user.User;
import com.nyxanite.ws.user.UserService;

@Service
public class BasicAuthTokenService implements TokenService {

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Token createToken(User user, Credentials creds) {
        String emailColonPw = creds.email() + ":" + creds.password();
        String token = Base64.getEncoder().encodeToString(emailColonPw.getBytes());
        return new Token("Basic", token);
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if (authorizationHeader == null)
            return null;
        var base64Encoded = authorizationHeader.split("Basic ")[1];
        var decodedValue = new String(Base64.getDecoder().decode(base64Encoded));
        var credentials = decodedValue.split(":");
        var email = credentials[0];
        var password = credentials[1];
        User inDB = userService.findByEmail(email);
        if (inDB == null)
            return null;
        if (!passwordEncoder.matches(password, inDB.getPassword()))
            return null;
        return inDB;
    }

}

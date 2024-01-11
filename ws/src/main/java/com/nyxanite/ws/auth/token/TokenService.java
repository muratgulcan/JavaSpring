package com.nyxanite.ws.auth.token;

import com.nyxanite.ws.auth.dto.Credentials;
import com.nyxanite.ws.user.User;

public interface TokenService {

    public Token createToken(User user, Credentials creds);

    public User verifyToken(String authorizationHeader);

}

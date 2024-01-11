package com.nyxanite.ws.auth.dto;

import com.nyxanite.ws.auth.token.Token;
import com.nyxanite.ws.user.dto.UserDTO;

public class AuthResponse {

    UserDTO user;

    Token token;

    public Token getToken() {
        return token;
    }

    public void setToken(Token token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

}

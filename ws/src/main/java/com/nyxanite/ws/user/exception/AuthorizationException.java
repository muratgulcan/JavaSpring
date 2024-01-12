package com.nyxanite.ws.user.exception;

public class AuthorizationException extends RuntimeException {
    public AuthorizationException() {
        super("Forbidden");
    }
}

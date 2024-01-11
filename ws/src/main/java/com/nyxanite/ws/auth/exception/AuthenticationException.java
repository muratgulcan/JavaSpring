package com.nyxanite.ws.auth.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.nyxanite.ws.shared.Messages;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException() {
        super(Messages.getMessageForLocale("nyxanite.auth.invalid.credentials", LocaleContextHolder.getLocale()));
    }
}

package com.nyxanite.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.nyxanite.ws.shared.Messages;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super(Messages.getMessageForLocale("nyxanite.activate.user.invalid", LocaleContextHolder.getLocale()));
    }
}

package com.nyxanite.ws.user.exception;

import org.springframework.context.i18n.LocaleContextHolder;

import com.nyxanite.ws.shared.Messages;

public class NotFoundException extends RuntimeException {
    public NotFoundException(long id) {
        super(Messages.getMessageForLocale("nyxanite.user.not.found", LocaleContextHolder.getLocale(), id));
    }
}

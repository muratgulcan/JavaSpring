package com.nyxanite.ws.user.validation;

import org.springframework.beans.factory.annotation.Autowired;

import com.nyxanite.ws.file.FileService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FileTypeValidator implements ConstraintValidator<FileType, String> {

    @Autowired
    FileService fileService;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty())
            return true;
        String type = fileService.detectType(value);
        if (type.equals("image/jpeg") || type.equals("image/png") || type.equals("image/jpg")) {
            return true;
        } else {
            return false;
        }
    }

}

package com.nyxanite.ws.user.validation;

import org.springframework.beans.factory.annotation.Autowired;

import com.nyxanite.ws.user.User;
import com.nyxanite.ws.user.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

//user.java'da email tipi string olduğu için ikinci parametreye string verdik
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        User inDB = userRepository.findByEmail(value);
        return inDB == null;
    }

}

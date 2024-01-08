package com.nyxanite.ws.user.dto;

import com.nyxanite.ws.user.User;
import com.nyxanite.ws.user.validation.UniqueEmail;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserCreate(
        @NotBlank(message = "{nyxanite.constraints.username.notblank}") @Size(min = 4, max = 255) String username,

        @NotBlank @Email @UniqueEmail String email,

        @Size(min = 6, max = 255) String password) {
    public User toUser() {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        return user;
    }
}

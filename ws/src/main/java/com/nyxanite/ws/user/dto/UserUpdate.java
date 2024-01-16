package com.nyxanite.ws.user.dto;

import com.nyxanite.ws.user.validation.FileType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdate(
        @NotBlank(message = "{nyxanite.constraints.username.notblank}") @Size(min = 4, max = 255) String username,
        @FileType String image) {

}

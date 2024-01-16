package com.nyxanite.ws.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdate(
                @NotBlank(message = "{nyxanite.constraints.username.notblank}") @Size(min = 4, max = 255) String username,
                String image) {

}

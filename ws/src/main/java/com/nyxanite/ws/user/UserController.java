package com.nyxanite.ws.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nyxanite.ws.configuration.CurrentUser;
import com.nyxanite.ws.shared.GenericMessage;
import com.nyxanite.ws.shared.Messages;
import com.nyxanite.ws.user.dto.UserCreate;
import com.nyxanite.ws.user.dto.UserDTO;
import com.nyxanite.ws.user.dto.UserUpdate;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
public class UserController {

    // autowired, bizer verilmesi için kullanılan bir annotation dependency
    // injection deniliyor.
    @Autowired
    UserService userService;

    // @Autowired
    // MessageSource messageSource;

    @PostMapping("/api/v1/users")
    GenericMessage createUser(@Valid @RequestBody UserCreate user) {
        userService.save(user.toUser());
        String message = Messages.getMessageForLocale("nyxanite.create.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/api/v1/users/{token}/active")
    GenericMessage activateUser(@PathVariable String token) {
        userService.activateUser(token);
        String message = Messages.getMessageForLocale("nyxanite.activate.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @GetMapping("/api/v1/users")
    Page<UserDTO> getUsers(Pageable pageable,
            @AuthenticationPrincipal CurrentUser currentUser) {
        return userService.getUsers(pageable, currentUser).map(UserDTO::new);
    }

    @GetMapping("/api/v1/users/{id}")
    UserDTO getUserById(@PathVariable long id) {
        return new UserDTO(userService.getUser(id));
    };

    @PutMapping("/api/v1/users/{id}")
    @PreAuthorize("#id == principal.id")
    UserDTO updateUser(@PathVariable long id, @Valid @RequestBody UserUpdate userUpdate,
            String authorizationHeader,
            @AuthenticationPrincipal CurrentUser currentUser) {

        // if (currentUser.getId() != id) {
        // throw new AuthorizationException();
        // }
        return new UserDTO(userService.updateUser(id, userUpdate));
    }

}

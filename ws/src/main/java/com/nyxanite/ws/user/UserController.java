package com.nyxanite.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nyxanite.ws.GenericMessage;

@RestController
public class UserController {

    // autowired, bizer verilmesi için kullanılan bir annotation dependency injection deniliyor.
    @Autowired
    UserService userService;
    
    @PostMapping("/api/v1/users")
    GenericMessage createUser(@RequestBody User user) {
        userService.save(user);
        return new GenericMessage("User created");
    }

}

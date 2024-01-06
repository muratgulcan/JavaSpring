package com.nyxanite.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    // autowired, bizer verilmesi için kullanılan bir annotation dependency injection deniliyor.
    @Autowired
    UserRepository userRepository;
    
    @PostMapping("/api/v1/users")
    void createUser(@RequestBody User user) {
        userRepository.save(user);
    }

}

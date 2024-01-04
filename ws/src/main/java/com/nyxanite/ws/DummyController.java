package com.nyxanite.ws;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DummyController {

    @GetMapping("/deneme")
    String test(){
        return "test message";
    }
}

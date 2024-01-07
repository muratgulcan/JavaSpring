package com.nyxanite.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void save(User user) {
        try {
            String encoderPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encoderPassword);
            userRepository.save(user);
        } catch (DataIntegrityViolationException ex) {
            throw new NotUniqueEmailException();
        }
    }
}

package com.nyxanite.ws.user;

import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.email.EmailService;
import com.nyxanite.ws.user.dto.UserUpdate;
import com.nyxanite.ws.user.exception.ActivationNotificationException;
import com.nyxanite.ws.user.exception.InvalidTokenException;
import com.nyxanite.ws.user.exception.NotFoundException;
import com.nyxanite.ws.user.exception.NotUniqueEmailException;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    EmailService emailService;

    @Transactional(rollbackOn = MailException.class)
    public void save(User user) {
        try {
            String encoderPassword = passwordEncoder.encode(user.getPassword());
            user.setActivationToken(UUID.randomUUID().toString());
            user.setPassword(encoderPassword);
            userRepository.saveAndFlush(user);
            emailService.sendActivationEmail(user.getEmail(), user.getActivationToken());
        } catch (DataIntegrityViolationException ex) {
            throw new NotUniqueEmailException();
        } catch (MailException ex) {
            throw new ActivationNotificationException();
        }
    }

    public void activateUser(String token) {
        User inDB = userRepository.findByActivationToken(token);
        if (inDB == null) {
            throw new InvalidTokenException();
        }
        inDB.setActive(true);
        inDB.setActivationToken(null);
        userRepository.save(inDB);
    }

    public Page<User> getUsers(Pageable pageable, User loggedInUser) {
        if (loggedInUser == null) {
            return userRepository.findAll(pageable);
        }
        return userRepository.findByIdNot(loggedInUser.getId(), pageable);
    }

    public User getUser(long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(long id, UserUpdate userUpdate) {
        User inDB = getUser(id);
        inDB.setUsername(userUpdate.username());
        return userRepository.save(inDB);
    }

}

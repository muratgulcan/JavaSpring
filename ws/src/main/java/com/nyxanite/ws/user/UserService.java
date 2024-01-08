package com.nyxanite.ws.user;

import java.util.Properties;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.user.exception.NotUniqueEmailException;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional(rollbackOn = MailException.class)
    public void save(User user) {
        try {
            String encoderPassword = passwordEncoder.encode(user.getPassword());
            user.setActivation_token(UUID.randomUUID().toString());
            user.setPassword(encoderPassword);
            userRepository.save(user);
            sendActivationEmail(user);
        } catch (DataIntegrityViolationException ex) {
            throw new NotUniqueEmailException();
        }
    }

    private void sendActivationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@my-app.com");
        message.setTo(user.email);
        message.setSubject("Account Activation");
        message.setText("http://localhost:5173/activation/" + user.getActivation_token());
        getHJavaMailSender().send(message);
    }

    public JavaMailSender getHJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.ethereal.email");
        mailSender.setPort(587);
        mailSender.setUsername("ivory.vandervort47@ethereal.email");
        mailSender.setPassword("Nj4c33WKkxXd3nJtdvs");

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", "true");

        return mailSender;
    }
}

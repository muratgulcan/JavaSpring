package com.nyxanite.ws.email;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.configuration.NyxaniteProperties;

import jakarta.annotation.PostConstruct;

// import com.nyxanite.ws.user.User;

@Service
public class EmailService {

    JavaMailSenderImpl mailSender;

    @Autowired
    NyxaniteProperties nyxaniteProperties;

    @PostConstruct
    public void initialize() {
        this.mailSender = new JavaMailSenderImpl();
        mailSender.setHost(nyxaniteProperties.getEmail().host());
        mailSender.setPort(nyxaniteProperties.getEmail().port());
        mailSender.setUsername(nyxaniteProperties.getEmail().username());
        mailSender.setPassword(nyxaniteProperties.getEmail().password());
        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", "true");
    }

    public void sendActivationEmail(String email, String activation_token) {
        var activationUrl = nyxaniteProperties.getClient().host() + "/activation/" + activation_token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(nyxaniteProperties.getEmail().from());
        message.setTo(email);
        message.setSubject("Account Activation");
        message.setText(activationUrl);
        this.mailSender.send(message);
    }

}

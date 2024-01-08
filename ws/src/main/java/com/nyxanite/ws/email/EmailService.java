package com.nyxanite.ws.email;

import java.util.Properties;

import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

// import com.nyxanite.ws.user.User;

@Service
public class EmailService {

    JavaMailSenderImpl mailSender;

    public EmailService() {
        this.initialize();
    }

    public void initialize() {
        this.mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.ethereal.email");
        mailSender.setPort(587);
        mailSender.setUsername("ivory.vandervort47@ethereal.email");
        mailSender.setPassword("Nj4c33WKkxXd3nJtdv");
        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", "true");
    }

    public void sendActivationEmail(String email, String activation_token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@my-app.com");
        message.setTo(email);
        message.setSubject("Account Activation");
        message.setText("http://localhost:5173/activation/" + activation_token);
        this.mailSender.send(message);
    }

}

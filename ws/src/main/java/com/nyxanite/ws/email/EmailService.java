package com.nyxanite.ws.email;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.configuration.NyxaniteProperties;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

// import com.nyxanite.ws.user.User;

@Service
public class EmailService {

    JavaMailSenderImpl mailSender;

    @Autowired
    NyxaniteProperties nyxaniteProperties;

    @Autowired
    MessageSource messageSource;

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

    String activationEmail = """
            <html>
            <body>
            <h1>${title}</h1>
            <a href="${url}">${click}</a>
            </body>
            </html>
            """;

    public void sendActivationEmail(String email, String activation_token) {
        var activationUrl = nyxaniteProperties.getClient().host() + "/activation/" + activation_token;
        var title = messageSource.getMessage("nyxanite.mail.user.created.title", null, LocaleContextHolder.getLocale());
        var clickHere = messageSource.getMessage("nyxanite.mail.click.here", null, LocaleContextHolder.getLocale());

        var mailBody = activationEmail
                .replace("${url}", activationUrl)
                .replace("${title}", title)
                .replace("${click}", clickHere);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {
            message.setFrom(nyxaniteProperties.getEmail().from());
            message.setTo(email);
            message.setSubject(title);
            message.setText(mailBody, true);
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        this.mailSender.send(mimeMessage);
    }

}

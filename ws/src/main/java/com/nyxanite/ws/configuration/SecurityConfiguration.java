package com.nyxanite.ws.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@Configuration
@EnableWebSecurity
@RestController
public class SecurityConfiguration {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                (authentication) -> authentication.requestMatchers(AntPathRequestMatcher.antMatcher("/secured"))
                        .authenticated().anyRequest().permitAll());

        http.csrf(csrf -> csrf.disable());
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    };

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @GetMapping("/secured")
    String secured() {
        return "secured";
    }

    @GetMapping("/unsecured")
    String unsecured() {
        return "unsecured";
    }

}

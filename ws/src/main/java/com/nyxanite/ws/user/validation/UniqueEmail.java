package com.nyxanite.ws.user.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = { UniqueEmailValidator.class })
// user.java dosyasında @UniqueEmail şeklinde annotation kullanmamızı sağlayan
// ilgili annotation @Target'dır
@Target({ ElementType.FIELD })
// @Retention annotation hangi aşamalarda kullanılabileceğine dair bir
// konfigurarasyondur
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueEmail {

    String message() default "{nyxanite.constraints.email.notunique}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

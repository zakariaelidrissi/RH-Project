package com.rh.administration;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.dto.DemandeAttestationRequest;
import com.rh.administration.dto.DemandeAttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.services.AttestationService;
import com.rh.administration.services.DemandeAttestationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Instant;
import java.util.Date;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableFeignClients
public class AdministrationApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdministrationApplication.class, args);
    }
    /*
    @Bean
    CommandLineRunner start(AttestationService att, DemandeAttestationService dem) {
        return args -> {
            DemandeAttestationResponse res = dem.save(new DemandeAttestationRequest(
                    1L,
                    Attestation.AttestationType.Stage,
                    Attestation.Etablissement.FaculteSciences,
                    Date.from(Instant.now())
            ));
            AttestationResponse res1 = att.save(
                    new AttestationRequest(
                            res.getId(),
                            "Otmane Khtou",
                            "D654123",
                            "Meknès",
                            Date.from(Instant.now()),
                            Date.from(Instant.now()),
                            Attestation.Poste.Doyen,
                            Attestation.Etablissement.FaculteSciences,
                            Attestation.AttestationType.Stage
                    ));
            System.out.println("----------");
            System.out.println(res1.getId());
            System.out.println("----------");
        };
    }*/
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}

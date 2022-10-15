package com.rh.administration;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.DemandeAttestationRequest;
import com.rh.administration.entities.Attestation;
import com.rh.administration.services.AttestationService;
import com.rh.administration.services.DemandeAttestationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.Instant;
import java.util.Date;

@SpringBootApplication
public class AdministrationApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdministrationApplication.class, args);
    }

    //@Bean
    CommandLineRunner start(AttestationService att, DemandeAttestationService dem){
        return args -> {
            dem.save(new DemandeAttestationRequest(
                    1L,
                    Attestation.AttestationType.Stage,
                    Date.from(Instant.now())
            ));
            att.save(
                    new AttestationRequest(
                            null,
                            "otmane",
                            "D654123",
                            "dev",
                            Date.from(Instant.now()),
                            "fsMks",
                            Attestation.AttestationType.Stage));
        };
    }

}

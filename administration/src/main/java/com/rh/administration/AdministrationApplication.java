package com.rh.administration;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.entities.Attestation;
import com.rh.administration.services.AttestationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class AdministrationApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdministrationApplication.class, args);
    }

    //@Bean
    CommandLineRunner start(AttestationService service){
        return args -> {
            service.save(new AttestationRequest(null, "otmane", "D654123", "dev", new Date(), "fsMks", Attestation.AttestationType.Stage));
        };
    }

}

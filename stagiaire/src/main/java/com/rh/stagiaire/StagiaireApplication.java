package com.rh.stagiaire;

import com.rh.stagiaire.Model.StagiareRequest;
import com.rh.stagiaire.Repositories.StagiaireRepository;
import com.rh.stagiaire.Service.StagiaireService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.Instant;
import java.util.Date;

@SpringBootApplication
public class StagiaireApplication {

    public static void main(String[] args) {
        SpringApplication.run(StagiaireApplication.class, args);
    }

    @Bean
    CommandLineRunner start(StagiaireService ss) {
        return args -> {
             ss.addStagiaire(new StagiareRequest(
                    -1L,
                    1L,
                    "civi",
                    "net",
                    "ville",
                    "tele",
                    "cv",
                    "url"
            ));
            System.out.println("----------");
            System.out.println("created");
            System.out.println("----------");
        };
    }
}

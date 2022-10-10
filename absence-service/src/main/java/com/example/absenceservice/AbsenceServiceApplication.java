package com.example.absenceservice;

import com.example.absenceservice.entities.Demande;
import com.example.absenceservice.entities.NatureAbsence;
import com.example.absenceservice.feign.UserRestClient;
import com.example.absenceservice.model.User;
import com.example.absenceservice.repositories.DemandeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class AbsenceServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AbsenceServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(UserRestClient userRestClient,
                            DemandeRepository demandeRepository){
        return args -> {
            User user1 = userRestClient.getUserById(1L);
            User user2 = userRestClient.getUserById(2L);

            demandeRepository.save(new Demande(null, new Date(), new Date("02/07/2024"), NatureAbsence.MARIAGE, user1.getIdUser()));
            demandeRepository.save(new Demande(null, new Date(), new Date("20/10/2023"), NatureAbsence.NAISSANCE, user2.getIdUser()));
        };
    }
}

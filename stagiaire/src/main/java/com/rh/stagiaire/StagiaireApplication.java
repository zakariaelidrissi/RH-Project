package com.rh.stagiaire;

import com.rh.stagiaire.Entities.Stagiaire;
import com.rh.stagiaire.Repositories.StagiaireRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;


@EnableFeignClients
@SpringBootApplication
public class StagiaireApplication {

    public static void main(String[] args) {
        SpringApplication.run(StagiaireApplication.class, args);
    }


    //@Bean
    CommandLineRunner start(StagiaireRepository stagiaireRepository, RepositoryRestConfiguration restconfiguration){
        return args -> {
            restconfiguration.exposeIdsFor(Stagiaire.class);

            stagiaireRepository.save(new Stagiaire(1L,"Mr","BAC+8","ERRACHIDIA","",1L,null,null));
            stagiaireRepository.save(new Stagiaire(2L,"Mr","BAC+8","MEKNES","",2L,null,null));
            stagiaireRepository.save(new Stagiaire(3L,"Mr","BAC+8","MERIRT","",3L,null,null));

            stagiaireRepository.findAll().forEach(System.out::println);
        };
    }
}

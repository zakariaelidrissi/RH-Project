package com.RHmanagment.stagiaire;

import com.RHmanagment.stagiaire.Entities.Stagiaire;
import com.RHmanagment.stagiaire.Repositories.StagiaireRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
@EnableFeignClients
public class StagiaireApplication {

	public static void main(String[] args) { SpringApplication.run(StagiaireApplication.class, args); }
/*
	@Bean
	CommandLineRunner start(StagiaireRepository stagiaireRepository, RepositoryRestConfiguration restconfiguration){
		return args -> {
			restconfiguration.exposeIdsFor(Stagiaire.class);

			stagiaireRepository.save(new Stagiaire(null,"Mr","BAC+8","Meknès","0618566121","",""));
			stagiaireRepository.save(new Stagiaire(null,"Mme","BAC+8","Errachidia","0612345678","",""));
			stagiaireRepository.save(new Stagiaire(null,"Mr","BAC+5","Tinejdad","0609876543","",""));

			stagiaireRepository.findAll().forEach(System.out::println);
		};
	} */
}

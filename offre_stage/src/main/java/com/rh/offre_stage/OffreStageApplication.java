package com.rh.offre_stage;

import com.rh.offre_stage.Entities.OffreStage;
import com.rh.offre_stage.Entities.Postulation;
import com.rh.offre_stage.Repositories.OffreStageRepository;
import com.rh.offre_stage.Repositories.PostulationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class OffreStageApplication {

    public static void main(String[] args) {
        SpringApplication.run(OffreStageApplication.class, args);
    }

	//@Bean
    CommandLineRunner start(OffreStageRepository offrestageRepository, RepositoryRestConfiguration restconfiguration){
		return args -> {
			restconfiguration.exposeIdsFor(OffreStage.class);

			offrestageRepository.save(new OffreStage(1L,"Technicien Spécialisé IT","stage de fin d’étude",4, new Date("01/02/2023"),false,"BAC+2 Technicien Spécialisé",""));

			offrestageRepository.save(new OffreStage(2L,"Ingenieur Réseaux et Télécommunication","stage pré-embauche",6,new Date("01/07/2023"),true,"BAC+5 Ingénieur d'Etat",""));
			offrestageRepository.save(new OffreStage(3L,"Administrateur 2eme Grade Data Analyst","stage d’observation",1,new Date("01/09/2023"),false,"BAC+5 MASTER",""));

			offrestageRepository.findAll().forEach(System.out::println);
		};
	}
	@Bean
	CommandLineRunner start(PostulationRepository postulationRepository, RepositoryRestConfiguration restconfiguration){
		return args -> {
			restconfiguration.exposeIdsFor(OffreStage.class);

			postulationRepository.save(new Postulation(1L,1L,null,1L));

			postulationRepository.save(new Postulation(2L,2L,null,2L));

			postulationRepository.findAll().forEach(System.out::println);
		};
	}

}

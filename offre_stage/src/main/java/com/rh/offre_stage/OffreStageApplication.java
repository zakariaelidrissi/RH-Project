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
    CommandLineRunner start(OffreStageRepository offrestageRepository, PostulationRepository postulationRepository,
							RepositoryRestConfiguration restconfiguration){
		restconfiguration.exposeIdsFor(OffreStage.class, Postulation.class);
		return args -> {
			offrestageRepository.save(new OffreStage(null,"Technicien Spécialisé IT","stage de fin d’étude",4, new Date("01/02/2023"),false,"BAC+2 Technicien Spécialisé",""));
			offrestageRepository.save(new OffreStage(null,"Ingenieur Réseaux et Télécommunication","stage pré-embauche",6,new Date("01/07/2023"),true,"BAC+5 Ingénieur d'Etat",""));
			offrestageRepository.save(new OffreStage(null,"Administrateur 2eme Grade Data Analyst","stage d’observation",1,new Date("01/09/2023"),false,"BAC+5 MASTER",""));
			offrestageRepository.findAll().forEach(System.out::println);

			postulationRepository.save(new Postulation(null, 5L, 2L, new Date("01/07/2022"), "En cours", null, null));
			postulationRepository.findAll().forEach(System.out::println);
		};
	}

}

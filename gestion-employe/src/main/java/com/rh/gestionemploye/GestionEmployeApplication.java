package com.rh.gestionemploye;

import com.rh.gestionemploye.entities.Employe;
import com.rh.gestionemploye.repos.EmployeRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class GestionEmployeApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionEmployeApplication.class, args);
    }

    //@Bean
    CommandLineRunner start(EmployeRepo employeRepo, RepositoryRestConfiguration restconfiguration) {
        restconfiguration.exposeIdsFor(Employe.class);
        return args -> {

            employeRepo.save(new Employe(null, 3L, new Date("2020-04-15"), Employe.Departement.Informatique, Employe.Poste.Doyen, Employe.Etablissement.FS));
        };
    }

}

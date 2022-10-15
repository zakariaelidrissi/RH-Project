package com.example.formationservice;

import com.example.formationservice.entities.*;
import com.example.formationservice.feign.EmployeRestClient;
import com.example.formationservice.models.*;
import com.example.formationservice.service.FormationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class FormationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(FormationServiceApplication.class, args);
    }

    /*@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //WebMvcConfigurer.super.addCorsMappings(registry);
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }*/

    /*
    @Bean
    CommandLineRunner start(FormationService formationService,
                            EmployeRestClient userRestClient,
                            RepositoryRestConfiguration restConfiguration){
        restConfiguration.exposeIdsFor(Collaborateur.class, Demande.class, Formation.class, Plan.class);
        return args -> {

            // Create new formation
            FormationRequest formation1 = new FormationRequest(null, "Angular", "L'objectif de la formation de Angular ", "6 Months", new Date());
            FormationRequest formation2 = new FormationRequest(null, "Spring Boot", "L'objectif de la formation de Spring Boot ", "8 Months", new Date());
            formationService.addNewFormation(formation1);
            formationService.addNewFormation(formation2);

            // Get users
            Employe employe1 = userRestClient.getEmployeById(3L);
            Employe employe2 = userRestClient.getEmployeById(5L);
            Employe employe3 = userRestClient.getEmployeById(3L);

            // Create new collaborateur
            CollaborateurRequest collaborateur1 = new CollaborateurRequest();
            //collaborateur1.setCin("U567430");
            collaborateur1.setEmployeId(employe1.getId());
            formationService.addNewCollaborateur(collaborateur1);

            CollaborateurRequest collaborateur2 = new CollaborateurRequest();
            //collaborateur2.setCin("D789123");
            collaborateur2.setEmployeId(employe2.getId());
            formationService.addNewCollaborateur(collaborateur2);

            CollaborateurRequest collaborateur3 = new CollaborateurRequest();
            //collaborateur3.setCin("D123456");
            collaborateur3.setEmployeId(employe3.getId());
            formationService.addNewCollaborateur(collaborateur3);

            // Add collaborateur to formation
            formationService.addCollaborateurToFormation(new AddById(collaborateur1.getId(), formation1.getId()));
            formationService.addCollaborateurToFormation(new AddById(collaborateur2.getId(), formation1.getId()));
            //formationService.addCollaborateurToFormation(new AddById(collaborateur3.getId(), formation2.getId()));

            // Create new module
            Module module1 = new Module(null, "JavaScript", null);
            Module module2 = new Module(null, "HTML", null);
            Module module3 = new Module(null, "CSS", null);
            Module module4 = new Module(null, "JAVA", null);
            Module module5 = new Module(null, "JEE", null);

            //formationService.addNewModule(module1);
            //formationService.addNewModule(module2);
            //formationService.addNewModule(module3);
            //formationService.addNewModule(module4);
            //formationService.addNewModule(module5);

            // Create new plan
            PlanRequest plan1 = new PlanRequest();
            plan1.setName("Angular Plan");
            plan1.setPlanDate(new Date());
            plan1.setResponsableID(collaborateur1.getEmployeId());
            formationService.addNewPlan(plan1);

            // Add Formation To Plan
            formationService.addFormationToPlan(new AddById(formation1.getId(), plan1.getId()));


            // Add modules to plan
            formationService.addModuleToPlan(new AddWithStr(module1.getName(), plan1.getName()));
            formationService.addModuleToPlan(new AddWithStr(module2.getName(), plan1.getName()));
            formationService.addModuleToPlan(new AddWithStr(module3.getName(), plan1.getName()));

            // Add demande
            formationService.addDemande(new AddById(collaborateur1.getId(), formation1.getId()));
            formationService.addDemande(new AddById(collaborateur2.getId(), formation1.getId()));

        };
    }*/
}

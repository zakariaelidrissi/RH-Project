package com.example.absenceservice;

import com.example.absenceservice.entities.Demande;
import com.example.absenceservice.entities.EmployeAbsence;
import com.example.absenceservice.entities.NatureAbsence;
import com.example.absenceservice.feign.EmployeRestClient;
import com.example.absenceservice.model.Employe;
import com.example.absenceservice.repositories.AbsenceRepository;
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

    //@Bean
    CommandLineRunner start(EmployeRestClient userRestClient,
                            DemandeRepository demandeRepository,
                            AbsenceRepository absenceRepository){
        return args -> {
            Employe emp1 = userRestClient.getEmployeById(1L);
            Employe emp2 = userRestClient.getEmployeById(3L);

            EmployeAbsence abs = new EmployeAbsence();

            abs.setDateAbs(new Date());
            abs.setDuree("");
            abs.setNatureAbsence(NatureAbsence.NONJUSTIFIEE);
            abs.setEmployeId(emp1.getId());
            abs.setJustificatif(false);

            absenceRepository.save(abs);

            //demandeRepository.save(new Demande(null, new Date(), new Date("02/07/2024"), NatureAbsence.MARIAGE, emp1.getIdUser(), null));
            //demandeRepository.save(new Demande(null, new Date(), new Date("20/10/2023"), NatureAbsence.NAISSANCE, emp2.getIdUser(), null));
        };
    }
}

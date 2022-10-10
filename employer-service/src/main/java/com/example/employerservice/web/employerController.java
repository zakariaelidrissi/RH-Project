package com.example.employerservice.web;

import com.example.employerservice.feign.AbsenceRestClient;
import com.example.employerservice.feign.FormationRestClient;
import com.example.employerservice.feign.UserRestClient;
import com.example.employerservice.models.DemandeAbsence;
import com.example.employerservice.models.DemandeFormation;
import com.example.employerservice.models.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
public class employerController {

    private UserRestClient userRestClient;
    private FormationRestClient formationRestClient;
    private AbsenceRestClient absenceRestClient;

    //@GetMapping(path = "/getUser/{id}")
    User getUser(@PathVariable Long id){
        return userRestClient.getUserById(id);
    }

    @PostMapping(path = "/addDemandeFormation")
    void addDemandeFormation(@RequestBody DemandeFormation demandeFormation){
        formationRestClient.demandeFormation(demandeFormation);
    }

    @PostMapping(path = "/addDemandeAbsence")
    void addDemandeAbsence(@RequestBody DemandeAbsence demandeAbsence){
        absenceRestClient.demandeAbsence(demandeAbsence);
    }
}

package com.example.employerservice.web;

import com.example.employerservice.feign.AbsenceRestClient;
import com.example.employerservice.feign.AttestationRestClient;
import com.example.employerservice.feign.FormationRestClient;
import com.example.employerservice.feign.UserRestClient;
import com.example.employerservice.models.*;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
public class employerController {

    private UserRestClient userRestClient;
    private FormationRestClient formationRestClient;
    private AbsenceRestClient absenceRestClient;
    private AttestationRestClient attestationRestClient;

    // ************************ GET **************************

    @GetMapping(path = "/getUser/{id}")
    public User getUser(@PathVariable Long id){
        return userRestClient.getUserById(id);
    }

    @GetMapping(path = "/employe/getAtt/{id}")
    public DemandeAttestationResponse getAtt(@PathVariable Long id){
        return attestationRestClient.getAll(id);
    }

    @GetMapping(path = "/absences/{idEmp}")
    List<Absence> getAllAbs(@PathVariable Long idEmp){
        return absenceRestClient.getAllAbs(idEmp);
    }

    // ************************ POST **************************

    @PostMapping(path = "/addDemandeFormation")
    public void addDemandeFormation(@RequestBody DemandeFormationRequest demandeFormation){
        formationRestClient.demandeFormation(demandeFormation);
    }

    @PostMapping(path = "/sendDemandeAbsence")
    public void addDemandeAbsence(@RequestBody DemandeAbsence demandeAbsence){
        absenceRestClient.demandeAbsence(demandeAbsence);
    }

    @PostMapping(path = "/employe/sendDemandeAtt")
    public DemandeAttestationResponse sendDemand(@RequestBody DemandeAttestationRequest demande){
        return attestationRestClient.sendDemande(demande);
    }

    // ************************ PUT **************************

    @PutMapping(path = "/employe/changePassword")
    public void changePassword(@RequestBody ChangePassword change){
        userRestClient.changePassword(change);
    }
}

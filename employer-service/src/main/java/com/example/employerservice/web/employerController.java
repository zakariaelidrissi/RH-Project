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

    // TODO : ************************ GET **************************

    @GetMapping(path = "/getUser/{id}")
    public User getUser(@PathVariable Long id){
        return userRestClient.getUserById(id);
    }

    @GetMapping(path = "/employe/getAtt/{userId}")
    public List<DemandeAttestationResponse> getAtt(@PathVariable Long userId){
        return attestationRestClient.getAllByUserId(userId);
    }

    @GetMapping(path = "/absences/{empId}")
    List<Absence> getAllAbs(@PathVariable Long empId){
        return absenceRestClient.getAllAbs(empId);
    }

    // TODO : ************************ POST **************************

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

    // TODO : ************************ PUT **************************

    @PutMapping(path = "/employe/changePassword")
    public void changePassword(@RequestBody ChangePassword change){
        userRestClient.changePassword(change);
    }
}

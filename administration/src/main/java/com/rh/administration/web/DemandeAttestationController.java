package com.rh.administration.web;


import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.dto.DemandeAttestationRequest;
import com.rh.administration.dto.DemandeAttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import com.rh.administration.services.AttestationService;
import com.rh.administration.services.DemandeAttestationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.Instant;
import java.util.List;

//@CrossOrigin
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DemandeAttestationController {
    DemandeAttestationService service;

    // ********************** POST ***************************************

    @PostMapping(path = "/demande-att")
    public DemandeAttestationResponse add(@RequestBody DemandeAttestationRequest req){
        if (req.getDate() == null){
            req.setDate(Date.from(Instant.now()));
        }
        return service.save(req);
    }

    @GetMapping(path = "/demande-att")
    public List<DemandeAttestationResponse> getAll(){
        return service.getAll();
    }
    @GetMapping(path = "/demande-att/user/{userId}")
    public List<DemandeAttestationResponse> getAllByUserId(@PathVariable Long userId){
        return service.getAllByUserId(userId);
    }
    @GetMapping(path = "/demande-att/{id}")
    public DemandeAttestationResponse get(@PathVariable Long id){
        return service.getById(id);
    }
    @GetMapping(path = "/demande-att/type/{type}")
    public List<DemandeAttestationResponse> getAllByType(@PathVariable DemandeAttestation.AttestationType type){
        return service.getAllByType(type);
    }
    @PostMapping(path="/demande-att/accept/{id}")
    public ResponseEntity acceptDemande(@PathVariable Long id){
        try {
            service.acceptDemande(id);
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping(path="/demande-att/reject/{id}")
    public ResponseEntity rejectDemande(@PathVariable Long id){
        try {
            service.rejectDemande(id);
            return ResponseEntity.ok().build();
        }catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping(path = "/demande-att/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

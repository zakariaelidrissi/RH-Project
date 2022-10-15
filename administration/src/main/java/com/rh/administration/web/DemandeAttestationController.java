package com.rh.administration.web;


import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.dto.DemandeAttestationRequest;
import com.rh.administration.dto.DemandeAttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.services.AttestationService;
import com.rh.administration.services.DemandeAttestationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.Instant;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
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
    @GetMapping(path = "/demande-att/{id}")
    public DemandeAttestationResponse getAll(@PathVariable Long id){
        return service.getById(id);
    }
    @GetMapping(path = "/demande-att/type/{type}")
    public List<DemandeAttestationResponse> getAllByType(@PathVariable Attestation.AttestationType type){
        return service.getAllByType(type);
    }
    @GetMapping(path = "/demande-att/done/{done}")
    public List<DemandeAttestationResponse> getAllByType(@PathVariable boolean done){
        return service.getAllByDone(done);
    }
}

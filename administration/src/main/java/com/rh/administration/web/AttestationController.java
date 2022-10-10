package com.rh.administration.web;


import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.services.AttestationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
public class AttestationController {
    AttestationService service;

    // ********************** POST ***************************************
    @PostMapping(path = "/attestations")
    public AttestationResponse add(@RequestBody AttestationRequest req){
        return service.save(req);
    }

    // ********************** POST ***************************************
    @PutMapping(path = "/attestations")
    public AttestationResponse update(@RequestBody AttestationRequest req){
        return service.save(req);
    }

    // ********************** GET ***************************************
    @GetMapping(path = "/attestations/{id}")
    public AttestationResponse get(@PathVariable Long id){
        return service.getById(id);
    }

    @GetMapping(path = "/attestations/{key}/{value}")
    public List<AttestationResponse> get(@PathVariable String key,@PathVariable String value) throws Exception {
        switch (key){
            case "type":
                return service.getAllByType(attestationType(value));
            case "etablissement":
                return service.getAllByEtablissement(value);
            case "poste":
                return service.getAllByPoste(value);
            default:
                throw new Exception("key: "+key+" invalid");
        }
    }

    @GetMapping(path = "/attestations")
    public List<AttestationResponse> get(){
        System.out.println("---------");
        return service.getAll();
    }

    public Attestation.AttestationType attestationType(String type) throws Exception {
        switch(type.toLowerCase()){
            case "formation":
                return Attestation.AttestationType.Formation;
            case "stage":
                return Attestation.AttestationType.Stage;
            case "travail":
                return Attestation.AttestationType.Travail;
            default:
                throw new Exception("Type d'attestation invalid.");
        }
    }
}

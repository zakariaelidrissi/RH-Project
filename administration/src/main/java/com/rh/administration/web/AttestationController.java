package com.rh.administration.web;


import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.services.AttestationService;
import com.rh.administration.services.RejectedOrNotYetAcceptedException;
import lombok.AllArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

//@CrossOrigin("*")
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
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
                throw new Exception("Unimplemented");
                //return service.getAllByEtablissement(value);
            case "poste":
                throw new Exception("Unimplemented");
                //return service.getAllByPoste(value);
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
                throw new Exception("Type d'attestation invalid.");
                //return Attestation.AttestationType.Formation;
            case "stage":
                return Attestation.AttestationType.Stage;
            case "travail":
                return Attestation.AttestationType.Travail;
            default:
                throw new Exception("Type d'attestation invalid.");
        }
    }

    @GetMapping(path="/pdf/{id}")
    @ResponseBody
    public ResponseEntity<InputStreamSource> pdf(@PathVariable Long id){
        try{
            ByteArrayInputStream array = service.getPdf(id);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition","inline;");
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .headers(headers)
                    .body(new InputStreamResource(array));
        }catch(NoSuchElementException e){
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"No records");
        }catch(IOException e){
            System.out.println("??");
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Something went wrong");
        }catch(RejectedOrNotYetAcceptedException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}

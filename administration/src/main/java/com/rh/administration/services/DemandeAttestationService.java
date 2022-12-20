package com.rh.administration.services;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.dto.DemandeAttestationRequest;
import com.rh.administration.dto.DemandeAttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import com.rh.administration.feign.UserService;
import com.rh.administration.mappers.AttestationMapper;
import com.rh.administration.mappers.DemandeAttestationMapper;
import com.rh.administration.repos.AttestationRepo;
import com.rh.administration.repos.DemandeAttestationRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DemandeAttestationService {

    private DemandeAttestationRepo repo;
    private DemandeAttestationMapper mapper;
    private UserService userService;

    public DemandeAttestationResponse save(DemandeAttestationRequest req) {
        DemandeAttestation d = mapper.requestToDemande(req);
        d.setEtat(Attestation.Etat.Waiting);
        DemandeAttestationResponse a = mapper.demandeToDemandeResponse(repo.save(d));
        a.setUser(userService.getById(a.getIdUser()));
        return a;
    }

    public List<DemandeAttestationResponse> getAll() {
        return mapDemandeAttestations(repo.findAll());
    }

    private List<DemandeAttestationResponse> mapDemandeAttestations(List<DemandeAttestation> l){
        return l.stream().map(p-> {
            DemandeAttestationResponse a = mapper.demandeToDemandeResponse(p);
            a.setUser(userService.getById(a.getIdUser()));
            return a;
        }).collect(Collectors.toList());
    }

    public DemandeAttestationResponse getById(Long id) {
        Optional<DemandeAttestation> a = repo.findById(id);
        if(a.isPresent())
            return mapper.demandeToDemandeResponse(a.get());
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Id not found");
    }

    public List<DemandeAttestationResponse> getAllByType(Attestation.AttestationType type) {
        return mapDemandeAttestations(repo.findAllByType(type));
    }


    public boolean deleteById(Long id) {
        System.out.println("Deleted: " + id);
        repo.deleteById(id);
        return true;
    }

    public void acceptDemande(Long id) throws Exception {
        DemandeAttestation a = repo.findById(id).orElseThrow(
                ()->new Exception("Not found")
        );
        a.setEtat(Attestation.Etat.Accepted);
        repo.save(a);
    }
    public void rejectDemande(Long id) throws Exception {
        DemandeAttestation a = repo.findById(id).orElseThrow(
                ()->new Exception("Not found")
        );
        a.setEtat(Attestation.Etat.Rejected);
        repo.save(a);
    }
}

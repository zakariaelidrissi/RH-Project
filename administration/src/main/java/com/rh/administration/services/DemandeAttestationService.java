package com.rh.administration.services;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.dto.DemandeAttestationRequest;
import com.rh.administration.dto.DemandeAttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import com.rh.administration.mappers.AttestationMapper;
import com.rh.administration.mappers.DemandeAttestationMapper;
import com.rh.administration.repos.AttestationRepo;
import com.rh.administration.repos.DemandeAttestationRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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

    public DemandeAttestationResponse save(DemandeAttestationRequest req) {
        return mapper.demandeToDemandeResponse(repo.save(mapper.requestToDemande(req)));
    }

    public List<DemandeAttestationResponse> getAll() {
        return mapDemandeAttestations(repo.findAll());
    }

    private List<DemandeAttestationResponse> mapDemandeAttestations(List<DemandeAttestation> l){
        return l.stream().map(p->mapper.demandeToDemandeResponse(p)).collect(Collectors.toList());
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

    public List<DemandeAttestationResponse> getAllByDone(boolean done) {
        return mapDemandeAttestations(repo.findAllByDone(done));
    }
}

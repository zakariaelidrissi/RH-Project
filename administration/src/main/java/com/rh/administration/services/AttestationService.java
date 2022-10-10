package com.rh.administration.services;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.mappers.AttestationMapper;
import com.rh.administration.repos.AttestationRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AttestationService {

    private AttestationRepo repo;
    private AttestationMapper mapper;

    public AttestationResponse save(AttestationRequest req) {
        return mapper.attestationToAttestationResponse(repo.save(mapper.requestToAttestation(req)));
    }
    // TODO
    public List<AttestationResponse> getAll() {
        return collect(repo.findAll());
    }

    private List<AttestationResponse> collect(List<Attestation> l){
        return l.stream().map(p->mapper.attestationToAttestationResponse(p)).collect(Collectors.toList());
    }

    public void delete(AttestationRequest req) {
        repo.deleteById(req.getId());
    }

    public AttestationResponse getById(Long id) {
        // TODO
        return mapper.attestationToAttestationResponse(repo.findById(id).get());
    }

    public List<AttestationResponse> getAllByType(Attestation.AttestationType type) {
        return mapAttestations(repo.findAllByType(type));
    }

    public List<AttestationResponse> getAllByEtablissement(String value) {
        return mapAttestations(repo.findAllByEtablissement(value));
    }

    public List<AttestationResponse> getAllByPoste(String value) {
        return mapAttestations(repo.findAllByPoste(value));
    }



    private List<AttestationResponse> mapAttestations(List<Attestation> l){
        return l.stream().map(p->mapper.attestationToAttestationResponse(p)).collect(Collectors.toList());
    }
}

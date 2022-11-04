package com.rh.administration.services;

import com.rh.administration.core.AttestationTravailPdf;
import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import com.rh.administration.entities.User;
import com.rh.administration.feign.UserService;
import com.rh.administration.mappers.AttestationMapper;
import com.rh.administration.repos.AttestationRepo;
import com.rh.administration.repos.DemandeAttestationRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AttestationService {

    private AttestationRepo repo;
    private DemandeAttestationRepo demandeRepo;
    //private UserService userService;
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
    public ByteArrayInputStream getPdf(Long id) throws IOException, NoSuchElementException {
        Attestation att = repo.findById(id).get();
        DemandeAttestation demande = demandeRepo.findById(att.getIdDemande()).get();
        //User user = userService.getProductById(demande.getIdUser());
        User user = new User(Date.from(Instant.now()), User.Sexe.Femme);
        return AttestationTravailPdf.getInstance().createPDF(att,user);
    }
}

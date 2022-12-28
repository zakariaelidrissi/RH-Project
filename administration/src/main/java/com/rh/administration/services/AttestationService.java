package com.rh.administration.services;

import com.rh.administration.core.AttestationStagePdf;
import com.rh.administration.core.AttestationTravailPdf;
import com.rh.administration.core.IPDFCreator;
import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.entities.*;
import com.rh.administration.feign.EmployeService;
import com.rh.administration.feign.StagiaireService;
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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AttestationService {

    private AttestationRepo repo;
    private DemandeAttestationRepo demandeRepo;
    private UserService userService;
    private AttestationMapper mapper;
    private EmployeService employeService;
    private StagiaireService stagiaireService;

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

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public AttestationResponse getById(Long id) {
        // TODO
        return mapper.attestationToAttestationResponse(repo.findById(id).get());
    }

    /*
    public List<AttestationResponse> getAllByType(DemandeAttestation.AttestationType type) {
        return mapAttestations(repo.findAllByType(type));
    }

    public List<AttestationResponse> getAllByEtablissement(String value) {
        return mapAttestations(repo.findAllByEtablissement(value));
    }

    public List<AttestationResponse> getAllByPoste(String value) {
        return mapAttestations(repo.findAllByPoste(value));
    }*/

    private List<AttestationResponse> mapAttestations(List<Attestation> l){
        return l.stream().map(p->mapper.attestationToAttestationResponse(p)).collect(Collectors.toList());
    }

    public ByteArrayInputStream getPdfByDemandeId(Long demandeId) throws IOException, NoSuchElementException, RejectedOrNotYetAcceptedException {
        Optional<DemandeAttestation> demandeOpt = demandeRepo.findById(demandeId);
        if(!demandeOpt.isPresent()) {throw new NoSuchElementException("No Attestation Demande : demandeId " +demandeId);}
        DemandeAttestation demande = demandeOpt.get();
        if(demande.getEtat() == DemandeAttestation.Etat.Rejected){throw new RejectedOrNotYetAcceptedException("Rejected");}
        if(demande.getEtat() == DemandeAttestation.Etat.Waiting){throw new RejectedOrNotYetAcceptedException("Not yet accepted");}

        Long userId = demande.getUserId();
        User user = userService.getById(userId);
        if(user == null){throw new NoSuchElementException("No user found");}

        Attestation att = repo.findByDemandeId(demande.getId());//.get();
        if(att == null) {throw new NoSuchElementException("No Attestation: demandeId " + demandeId);}
        System.out.println(user);
        System.out.println(att);
        System.out.println(demande);
        User.UserRole role = user.getUserRole();
        IPDFCreator pdfCreator = getPDFCreator(demandeRepo.findById(att.getDemandeId()).get());
        if(role.equals(User.UserRole.EMPLOYER)){
            Employe employe = employeService.getByUserId(userId);
            employe.setUser(user);
            return pdfCreator.createPDF(att,employe);
        }else if(role.equals(User.UserRole.STAGIAIRE)){
            Stagiaire stagiaire = stagiaireService.getByUserId(userId);
            stagiaire.setUser(user);
            return pdfCreator.createPDF(att,stagiaire);
        }
        throw new NoSuchElementException("Invalid user Role: "+role.toString());
    }
    private IPDFCreator getPDFCreator(DemandeAttestation attestation) throws IOException {
        switch (attestation.getType()){
            case Travail:
                return AttestationTravailPdf.getInstance();
            case Stage:
                return AttestationStagePdf.getInstance();
            default:
               throw new NoSuchElementException("Le type d'attestion est inconnu: "+ attestation.getType());
        }
    }
}


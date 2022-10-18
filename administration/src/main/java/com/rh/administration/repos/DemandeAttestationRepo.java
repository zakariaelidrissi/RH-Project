package com.rh.administration.repos;

import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DemandeAttestationRepo extends JpaRepository<DemandeAttestation,Long> {
    List<DemandeAttestation> findAllByType(Attestation.AttestationType type);
    List<DemandeAttestation> findAllByDone(boolean done);
}
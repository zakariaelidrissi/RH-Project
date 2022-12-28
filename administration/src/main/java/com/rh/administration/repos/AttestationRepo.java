package com.rh.administration.repos;

import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttestationRepo extends JpaRepository<Attestation,Long> {
    //List<Attestation> findAllByType(DemandeAttestation.AttestationType type);
    //List<Attestation> findAllByEtablissement(String value);
    //List<Attestation> findAllByPoste(String value);
    Attestation findByDemandeId(Long id);
}

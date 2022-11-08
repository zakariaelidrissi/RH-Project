package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class AttestationRequest {
    Long id;
    Long idDemande;
    String nom;
    String cin;
    String ville;
    Date debutPoste;
    Date dateSignature;

    Attestation.Poste poste;
    Attestation.Etablissement etablissement;
    Attestation.AttestationType type;
}

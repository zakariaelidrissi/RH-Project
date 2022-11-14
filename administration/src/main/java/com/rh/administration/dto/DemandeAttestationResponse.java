package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class DemandeAttestationResponse {
    Long id;
    Long idUser;
    Attestation.AttestationType type;
    Attestation.Etablissement etablissement;
    Attestation.Poste poste;
    Date date;
    Attestation.Etat etat;
}

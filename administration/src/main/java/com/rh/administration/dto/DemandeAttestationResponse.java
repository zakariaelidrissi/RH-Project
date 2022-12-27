package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class DemandeAttestationResponse {
    Long id;
    Long userId;
    Attestation.AttestationType type;
    Attestation.Etablissement etablissement;
    Attestation.Poste poste;
    Date date;
    Attestation.Etat etat;

    User user;
}

package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class AttestationResponse {
    Long id;
    String nom;
    String cin;
    Date debutPoste;

    Attestation.Poste poste;
    Attestation.Etablissement etablissement;
    Attestation.AttestationType type;

    User user;
}

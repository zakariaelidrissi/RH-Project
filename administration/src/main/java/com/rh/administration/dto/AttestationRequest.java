package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class AttestationRequest {
    Long id;
    String nom;
    String cin;
    String poste;
    Date debutPoste;
    String etablissement;
    Attestation.AttestationType type;
}

package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import com.rh.administration.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class AttestationResponse {
    Long id;
    Long demandeId;
    DemandeAttestation.AttestationType type;

    User user;
}

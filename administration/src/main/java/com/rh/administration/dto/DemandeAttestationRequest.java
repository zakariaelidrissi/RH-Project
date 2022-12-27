package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class DemandeAttestationRequest {
    Long userId;
    Attestation.AttestationType type;
    Attestation.Etablissement etablissement;
    Date date;
}

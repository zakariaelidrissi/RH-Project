package com.rh.administration.dto;

import com.rh.administration.entities.Attestation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class AttestationRequest {
    Long demandeId;
    Date dateSignature;

    Attestation.AttestationType type;
}

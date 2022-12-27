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
    Long demandeId;
    Attestation.AttestationType type;

    User user;
}

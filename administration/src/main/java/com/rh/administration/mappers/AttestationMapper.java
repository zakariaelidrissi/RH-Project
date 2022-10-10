package com.rh.administration.mappers;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.entities.Attestation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AttestationMapper {
    Attestation requestToAttestation(AttestationRequest request);
    AttestationResponse attestationToAttestationResponse(Attestation customer);
}

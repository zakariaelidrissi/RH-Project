package com.rh.administration.mappers;

import com.rh.administration.dto.AttestationRequest;
import com.rh.administration.dto.AttestationResponse;
import com.rh.administration.dto.DemandeAttestationRequest;
import com.rh.administration.dto.DemandeAttestationResponse;
import com.rh.administration.entities.Attestation;
import com.rh.administration.entities.DemandeAttestation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DemandeAttestationMapper {
    DemandeAttestation requestToDemande(DemandeAttestationRequest request);
    DemandeAttestationResponse demandeToDemandeResponse(DemandeAttestation customer);
}

package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeAttestationRequest {
    Long userId;
    AttestationType type;
    Date date;
}

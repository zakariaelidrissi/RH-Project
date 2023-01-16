package com.example.formationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeRequest {
    private Long id;
    private Date dateDemande;
    private Long employeId;
    private Long formationId;
    private String status;
}

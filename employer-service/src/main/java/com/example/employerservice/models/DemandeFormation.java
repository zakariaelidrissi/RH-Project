package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeFormation {
    private Long idColl;
    private String FormationName;
}

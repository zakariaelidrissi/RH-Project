package com.example.formationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data @NoArgsConstructor @AllArgsConstructor
public class FormationRequest {
    private Long id;
    private String name;
    private String objectif;
    private String duree;
    private Date formationDate;
}

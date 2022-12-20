package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeAbsence {
    private Long id;
    private Date dateDebut;
    private Date dateFin;
    private NatureAbsence natureAbsence;
    private String justificatif;
    private String statut;
    private Long employeId;
}

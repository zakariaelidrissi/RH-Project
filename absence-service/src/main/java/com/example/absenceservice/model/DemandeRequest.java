package com.example.absenceservice.model;

import com.example.absenceservice.entities.NatureAbsence;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeRequest {
    private Long id;
    private Date dateDebut;
    private Date dateFin;
    private NatureAbsence natureAbsence;
    private byte[] justificatif;
    private String statut;
    private Long employeId;
}

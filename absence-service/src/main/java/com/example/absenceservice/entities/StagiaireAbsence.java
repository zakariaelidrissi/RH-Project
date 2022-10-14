package com.example.absenceservice.entities;

import com.example.absenceservice.model.Employe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
@Entity
public class StagiaireAbsence {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date dateAbs;
    @Enumerated(EnumType.STRING)
    private NatureAbsence natureAbsence;
    private boolean justificatif;
    private String duree;
    private Long stagiaireId;
    @Transient
    private Employe employe;
}

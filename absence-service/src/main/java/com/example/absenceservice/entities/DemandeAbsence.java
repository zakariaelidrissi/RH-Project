package com.example.absenceservice.entities;

import com.example.absenceservice.model.Employe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeAbsence {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date dateDebut;
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    @Enumerated(EnumType.STRING)
    private NatureAbsence natureAbsence;
//    private String justificatif;
    @Lob
    private byte[] justificatif;

    private String statut;
    private Long employeId;

    @Transient
    private Employe employe;
}

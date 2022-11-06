package com.example.absenceservice.entities;

import com.example.absenceservice.model.Employe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class EmployeAbsence {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date dateAbs;
    @Enumerated(EnumType.STRING)
    private NatureAbsence natureAbsence;
    private String justificatif;
    private String duree;
    private Long employeId;
    @Transient
    private Employe employe;
}

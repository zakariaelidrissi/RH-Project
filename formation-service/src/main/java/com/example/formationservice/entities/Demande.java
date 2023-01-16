package com.example.formationservice.entities;

import com.example.formationservice.models.Employe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Demande {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date dateDemande;
    private Long employeId;
    private Long formationId;
    private String status;

    @Transient
    private Employe employe;

    @Transient
    private Formation formation;
}

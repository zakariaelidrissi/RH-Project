package com.example.formationservice.entities;

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
    @ManyToOne
    private Collaborateur collaborateur;
    private String status;
    @ManyToOne
    private Formation formation;
}

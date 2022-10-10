package com.rh.administration.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Attestation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String nom;
    String cin;
    String poste;
    @Temporal(TemporalType.DATE)
    Date debutPoste;
    String etablissement;

    @Enumerated(EnumType.STRING)
    AttestationType type;

    public enum AttestationType{
        Formation,
        Stage,
        Travail
    }


}

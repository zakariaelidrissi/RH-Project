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
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    Long idDemande;
    String nom;
    String cin;
    String ville;

    @Temporal(TemporalType.DATE) Date debutPoste;
    @Temporal(TemporalType.DATE) Date dateSignature;


    @Enumerated(EnumType.STRING) Poste poste;
    @Enumerated(EnumType.STRING) Etablissement etablissement;
    @Enumerated(EnumType.STRING) AttestationType type;



    public enum AttestationType{
        Formation,
        Stage,
        Travail
    }

    public enum Etablissement{
        FaculteSciences("Faculté des Sciences"),
        Ensam("ENSAM");
        private final String name;
        private Etablissement(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }

    public enum Poste{
        Doyen("Doyen");
        //Dev("dev");
        private final String name;
        private Poste(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }

    public enum Etat{
        Accepted("Accepted"),
        Rejected("Rejected"),
        Waiting("Waiting");
        //Dev("dev");
        private final String name;
        private Etat(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }
}

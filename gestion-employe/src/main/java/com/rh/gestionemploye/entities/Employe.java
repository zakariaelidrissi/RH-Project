package com.rh.gestionemploye.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employe {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long userId;
    @Temporal(TemporalType.DATE)
    Date debutAmbauche;
    @Enumerated(EnumType.STRING) Departement departement;
    @Enumerated(EnumType.STRING) Poste poste;
    @Enumerated(EnumType.STRING) Etablissement etablissement;
    public enum Etablissement{
        Fs("Faculté des Sciences"),
        Ensam("ENSAM");
        private final String name;
        private Etablissement(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }
    public enum Departement{
        Info("Informatique");
        private final String name;
        private Departement(String name) {
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
    /*
    String nom;
    @Column(unique = true)
    String cin;
    String email;
    @Temporal(TemporalType.DATE)
    Date naissance;
     */
}

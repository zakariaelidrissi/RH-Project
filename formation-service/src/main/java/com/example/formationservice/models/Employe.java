package com.example.formationservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class Employe {
    Long id;
    Long userId;
    Date debutAmbauche;
    String departement;
    Poste poste;
    Etablissement etablissement;

    User user;

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
}

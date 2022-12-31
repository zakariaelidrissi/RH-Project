package com.rh.administration.entities;

import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class Employe {
    Long id;
    Long userId;
    Date debutAmbauche;
    String departement;
    String poste;
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

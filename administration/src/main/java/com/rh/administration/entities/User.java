package com.rh.administration.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class User {
    Date dateNaissanse;
    Sexe sexe;
    public enum Sexe{
        Homme("Homme","Monsieur"),
        Femme("Femme","Madame");
        private final String name;
        private final String titre;
        private Sexe(String name,String titre) {
            this.name = name;
            this.titre = titre;
        }
        public String getName() {
            return name;
        }
        public String getTitre() {
            return titre;
        }
    }
}

package com.rh.administration.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class User {
    private Long id;
    private String genre;
    private String nom;
    private String prenom;
    private String cin;
    private String Email;
    private String motDePasse;
    private Date dateNaissance;
    private String tel;
    private UserRole userRole;
    private String verificationCode;
    public enum UserRole {
        USER,
        ADMIN,
        EMPLOYER,
        STAGIAIRE,
        STAGIAIRE_POTENTIEL
    }
}
//public class User {
//    Date dateNaissanse;
//    Sexe sexe;
//    public enum Sexe{
//        Homme("Homme","Monsieur"),
//        Femme("Femme","Madame");
//        private final String name;
//        private final String titre;
//        private Sexe(String name,String titre) {
//            this.name = name;
//            this.titre = titre;
//        }
//        public String getName() {
//            return name;
//        }
//        public String getTitre() {
//            return titre;
//        }
//    }
//}

package com.rh.administration.entities;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String genre;
    private String nom;
    private String prenom;
    @Column(unique = true)
    private String email;
    private String motDePasse;
    @Column(unique = true)
    private String tel;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private boolean emailVerified;
    @Column(name = "verification_code", length = 64)
    private String verificationCode;
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

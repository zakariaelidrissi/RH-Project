package com.RHmanagment.user.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String genre;
    private String nom;
    private String prenom;
    @Column(unique = true)
    //private int EmailId;
    private String motDePasse;
    @Column(unique = true)
    private String tel;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    //private boolean emailVerified;
    @Column(name = "verification_code", length = 64)
    private String verificationCode;

}

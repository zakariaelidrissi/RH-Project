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
    String nom;
    String cin;
    String email;
    @Temporal(TemporalType.DATE)
    Date naissance;
    @Temporal(TemporalType.DATE)
    Date debutAmbauche;
    String departement;
    String poste;
}
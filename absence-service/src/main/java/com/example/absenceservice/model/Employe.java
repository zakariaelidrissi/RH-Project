package com.example.absenceservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class Employe {
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

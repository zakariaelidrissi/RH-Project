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
    Long userId;
    @Temporal(TemporalType.DATE)
    Date debutAmbauche;
    String departement;
    String poste;
    String etablissement;
    User user;
}

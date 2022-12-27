package com.rh.gestionemploye.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@AllArgsConstructor
@Data
public class EmployeResponse {
    Long id;
    Long userId;
    Date debutAmbauche;
    String departement;
    String poste;
}

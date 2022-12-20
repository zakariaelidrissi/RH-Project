package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class Absence {
    private Long id;
    private Date dateAbs;
    private NatureAbsence natureAbsence;
    private String justificatif;
    private String duree;
    private Long employeId;
}

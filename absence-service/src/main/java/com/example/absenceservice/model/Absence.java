package com.example.absenceservice.model;

import com.example.absenceservice.entities.NatureAbsence;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class Absence {
    private Long id;
    private Date dateAbs;
    @Enumerated(EnumType.STRING)
    private NatureAbsence natureAbsence;
    private String justificatif;
    private String duree;
    private String status;
    private Long userId;
    private String userName;
}

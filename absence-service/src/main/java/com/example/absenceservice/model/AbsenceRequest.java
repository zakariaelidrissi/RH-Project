package com.example.absenceservice.model;

import com.example.absenceservice.entities.NatureAbsence;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class AbsenceRequest {
    private Long id;
    private Date dateAbs;
    private NatureAbsence natureAbsence;
    private boolean justificatif;
    private String duree;
    private Long EmployeId;
}

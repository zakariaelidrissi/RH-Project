package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeAttestationResponse {
    private Long id;
    private Long idUser;
    private String type;
    private String etablissement;
    @Temporal(TemporalType.DATE)
    private Date date;
    private boolean done;
}

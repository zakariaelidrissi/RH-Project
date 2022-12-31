package com.example.employerservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor
public class DemandeAttestationResponse {
    Long id;
    Long userId;
    AttestationType type;
    Date date;
    Etat etat;

    User user;
}

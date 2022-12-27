package com.rh.administration.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class DemandeAttestation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(unique = true)
    Long userId;
    @Enumerated(EnumType.STRING) Attestation.AttestationType type;
    @Enumerated(EnumType.STRING) Attestation.Etablissement etablissement;
    @Temporal(TemporalType.DATE)
    Date date;
    @Enumerated(EnumType.STRING) Attestation.Etat etat;
}

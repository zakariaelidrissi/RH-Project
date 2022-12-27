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
public class Attestation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(unique = true)
    Long demandeId;

    //@Temporal(TemporalType.DATE) Date debutPoste;
    //@Temporal(TemporalType.DATE) Date dateSignature;

    //@Enumerated(EnumType.STRING) Poste poste;
    //@Enumerated(EnumType.STRING) Etablissement etablissement;
    //@Enumerated(EnumType.STRING) AttestationType type;
}

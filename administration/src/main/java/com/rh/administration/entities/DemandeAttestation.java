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
    @Column(unique = true) Long userId;
    @Enumerated(EnumType.STRING) AttestationType type;
    @Temporal(TemporalType.DATE) Date date;
    @Enumerated(EnumType.STRING) Etat etat;

    public enum AttestationType{
        //Formation,
        Stage,
        Travail
    }

    public enum Etat{
        Accepted("Accepted"),
        Rejected("Rejected"),
        Waiting("Waiting");
        //Dev("dev");
        private final String name;
        private Etat(String name) {
            this.name = name;
        }
        public String getName() {
            return name;
        }
    }
}

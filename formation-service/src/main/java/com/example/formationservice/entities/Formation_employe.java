package com.example.formationservice.entities;

import com.example.formationservice.models.Employe;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Formation_employe {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long employeId;
    private Long formationId;

    @Transient
    private Formation formation;

    @Transient
    private Employe employe;
}

package com.example.formationservice.entities;

import com.example.formationservice.models.Employe;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Plan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    @Temporal(TemporalType.DATE)
    private Date planDate;
    private Long employe_id;

    @Transient
    private Employe responsable;
}

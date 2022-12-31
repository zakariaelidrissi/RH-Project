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
public class Collaborateur {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "collaborateurs", fetch = FetchType.EAGER)
    private Set<Formation> formations = new HashSet<>();

    @OneToMany(mappedBy = "responsable", fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Collection<Plan> plans;

    @OneToMany(mappedBy = "collaborateur", fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Collection<Demande> demandes;

    @Column(unique = true)
    private Long empolyeID;

    @Transient
    private Employe employe;
}

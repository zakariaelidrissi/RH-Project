package com.example.formationservice.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.*;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Formation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String name;
    private String objectif;
    private String duree;

    @Temporal(TemporalType.DATE)
    private Date formationDate;

    /*@ManyToMany(fetch = FetchType.EAGER)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Collaborateur> collaborateurs = new ArrayList<>();

    @ManyToMany(mappedBy = "formation", fetch = FetchType.EAGER)
    private Set<Plan> plan = new HashSet<>();

    @OneToMany(mappedBy = "formation", fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Collection<Demande> demandes;*/
}

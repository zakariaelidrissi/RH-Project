package com.example.formationservice.entities;

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
    @ManyToOne
    private Collaborateur responsable;
    @ManyToMany(mappedBy = "plan", fetch = FetchType.EAGER)
    private List<Formation> formation = new ArrayList<>();
    //@ManyToMany(mappedBy = "plans", fetch = FetchType.EAGER)
    //private Set<Module> modules = new HashSet<>();
}

package com.rhmanagment.user.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class Compte {
    private String email;
    private String motDePasse;
}

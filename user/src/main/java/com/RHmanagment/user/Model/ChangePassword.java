package com.RHmanagment.user.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class ChangePassword {
    private Long id;
    private String password;
}

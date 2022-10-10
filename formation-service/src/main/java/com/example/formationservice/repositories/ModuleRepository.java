package com.example.formationservice.repositories;

import com.example.formationservice.entities.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin("*")
//@RepositoryRestResource
public interface ModuleRepository {
    Module findByName(String moduleName);
}

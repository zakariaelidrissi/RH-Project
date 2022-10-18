package com.RHmanagment.user.Repositories;

import com.RHmanagment.user.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface UserRepository extends JpaRepository<User,Long> {
}
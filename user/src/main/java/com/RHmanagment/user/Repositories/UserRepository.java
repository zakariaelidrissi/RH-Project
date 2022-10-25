package com.rhmanagment.user.Repositories;

import com.rhmanagment.user.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findUserById(Long id);
    User findUserByEmail(String email);
}
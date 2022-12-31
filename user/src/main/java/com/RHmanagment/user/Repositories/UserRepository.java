package com.RHmanagment.user.Repositories;

import com.RHmanagment.user.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findUserById(Long id);

    User findUserByEmail(String emailId);
}
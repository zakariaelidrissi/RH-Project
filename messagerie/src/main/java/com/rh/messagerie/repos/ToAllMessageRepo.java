package com.rh.messagerie.repos;

import com.rh.messagerie.entities.ToAllMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToAllMessageRepo extends JpaRepository<ToAllMessage,Long> {
    List<ToAllMessage> findBySender(Long id);
}

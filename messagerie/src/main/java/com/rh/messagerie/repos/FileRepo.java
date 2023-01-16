package com.rh.messagerie.repos;

import com.rh.messagerie.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FileRepo extends JpaRepository<Message,Long> {

    @Query(
            value = "select data from file where id = ?1",
            nativeQuery = true
    )
    Byte[] loadData(Long id);
}

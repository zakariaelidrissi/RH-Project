package com.rh.messagerie.repos;

import com.rh.messagerie.entities.LastMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface LastMessageRepo extends JpaRepository<LastMessage,Long> {

    List<LastMessage> findAllBySender(Long id);
    List<LastMessage> findAllByReceiver(Long id);
    List<LastMessage> findAllByReceiverOrSender(Long id,Long id2);
    LastMessage findBySenderAndReceiver(Long id1,Long id2);
}

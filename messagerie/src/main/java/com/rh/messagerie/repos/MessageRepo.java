package com.rh.messagerie.repos;

import com.rh.messagerie.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message,Long> {
    List<Message> findByReceiver(Long receiverId);
    List<Message> findByReceiverAndSender(Long receiverId,Long senderId);

    List<Message> findBySender(Long sender);

    List<Message> findBySenderAndReceiver(Long sender, Long id);
}

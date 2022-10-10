package com.rh.messagerie.services;

import com.rh.messagerie.dto.MessageRequest;
import com.rh.messagerie.dto.MessageResponse;
import com.rh.messagerie.dto.SendMessageToAllRequest;
import com.rh.messagerie.dto.ToAllMessageResponse;
import com.rh.messagerie.entities.Message;
import com.rh.messagerie.entities.ToAllMessage;
import com.rh.messagerie.mappers.MessageMapper;
import com.rh.messagerie.repos.MessageRepo;
import com.rh.messagerie.repos.ToAllMessageRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class MessageService {

    private MessageRepo repo;
    private ToAllMessageRepo toAllRepo;
    private MessageMapper mapper;

    public MessageResponse save(MessageRequest req) {
        return mapper.messageToMessageResponse(repo.save(mapper.messageRequestToMessage(req)));
    }

    public ToAllMessageResponse saveToAll(SendMessageToAllRequest req) {
        return mapper.messageToAllMessageResponse(toAllRepo.save(mapper.messageRequestToAllMessage(req)));
    }
    // TODO
    public List<ToAllMessageResponse> getToAll(long senderId) {
        return mapToAllMessages(toAllRepo.findBySender(senderId));//collect(toAllRepo.findAll());
    }

    public List<MessageResponse> getAllByReceiverId(long receiverId) {
        return this.mapMessages(repo.findByReceiver(receiverId));
    }
    public List<MessageResponse> getAllByReceiverAndSender(long receiverId,long senderId) {
        return this.mapMessages(repo.findByReceiverAndSender(receiverId,senderId));
    }


    private List<MessageResponse> mapMessages(List<Message> l){
        return l.stream().map(p->mapper.messageToMessageResponse(p)).collect(Collectors.toList());
    }
    private List<ToAllMessageResponse> mapToAllMessages(List<ToAllMessage> l){
        return l.stream().map(p->mapper.messageToAllMessageResponse(p)).collect(Collectors.toList());
    }
    List<MessageResponse> map(List<ToAllMessageResponse> messages,long receiverId){
        return messages.stream().map(toAllMessageResponse-> {
            return new MessageResponse(
                    toAllMessageResponse.getId(),
                    toAllMessageResponse.getText(),
                    toAllMessageResponse.getSender(),
                    toAllMessageResponse.getDate(),
                    receiverId,
                    // TODO
                    false
            );
        }).collect(Collectors.toList());
    }
    public List<MessageResponse> getConversationBetweenUsers(long id1,long id2){
        List<MessageResponse> conversation = this.getAllByReceiverAndSender(id1,id2);

        {
            // TODO: add SentToAllMessage
            conversation.addAll(map(this.getToAll(id1),id2));
            conversation.addAll(map(this.getToAll(id2),id1));
        }
        conversation.addAll(this.getAllByReceiverAndSender(id2,id1));
        conversation.sort(Comparator.comparing(MessageResponse::getDate));
        return conversation;
    }

    public List<MessageResponse> getAllBySender(long senderId) {
        return this.mapMessages(this.repo.findBySender(senderId));
    }

    public List<MessageResponse> getAllUnseenMessages(long senderId) {
        return this.mapMessages(this.repo.findBySeenAndReceiver(false, senderId));
    }
    /*
    public void delete(MessageRequest req) {
        repo.deleteById(req.getId());
    }
    */

}

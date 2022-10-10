package com.rh.messagerie.web;

import com.rh.messagerie.dto.*;
import com.rh.messagerie.services.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
public class MessageController {
    MessageService service;

    // ********************** POST ***************************************
    @PostMapping(path = "/messages/send2all")
    public ToAllMessageResponse sendToAll(@RequestBody SendMessageToAllRequest req){
        return service.saveToAll(req);
    }
    @PostMapping(path = "/messages")
    public MessageResponse send(@RequestBody MessageRequest req){
        return service.save(req);
    }
    @PostMapping(path = "/messages/send2many")
    public MessageResponse sendToMany(@RequestBody SendMessageToManyRequest req){
        req.getReceivers().forEach((id)->{
            service.save(new MessageRequest(req.getId(),req.getText(),req.getSender(),req.getDate(),id));
        });
        // TODO
        return null;
    }
    // ********************** GET ***************************************
    @GetMapping(path = "/messages/received/{userId}")
    public List<MessageResponse> getReceivedMessages(@PathVariable long userId){
        return service.getAllByReceiverId(userId);
    }
    @GetMapping(path = "/messages/received/{userId}/{senderId}")
    public List<MessageResponse> getReceivedMessages(@PathVariable long userId,@PathVariable long senderId){
        return service.getAllByReceiverAndSender(userId,senderId);
    }
    @GetMapping(path = "/messages/sent/{senderId}")
    public List<MessageResponse> getSentMessages(@PathVariable long senderId){
        return service.getAllBySender(senderId);
    }
    @GetMapping(path = "/messages/conversation/{id1}/{id2}")
    public List<MessageResponse> getConversationBetweenUsers(@PathVariable long id1,@PathVariable long id2){
        return service.getConversationBetweenUsers(id1,id2);
    }
}

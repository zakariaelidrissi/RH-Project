package com.rh.messagerie.web;

import com.rh.messagerie.dto.*;
import com.rh.messagerie.entities.Conversation;
import com.rh.messagerie.entities.MiniMessage;
import com.rh.messagerie.services.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
public class MessageController {
    MessageService service;
    @GetMapping(path = "/conversation/{userId1}/{userId2}")
    public Conversation getConversation(@PathVariable long userId1, @PathVariable long userId2){
        try {
            return service.getConversationBetweenUsers(userId1,userId2);
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PostMapping(path = "/send-message")
    public MessageResponse sendMessage(@RequestBody MessageRequest messageRequest){
        try {
            return service.sendMessage(messageRequest);
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @GetMapping(path = "/last-contacted/{id}")
    public List<MiniMessage> getMiniMessagesForUser(@PathVariable Long id){
        try {
            return service.getMiniMessagesForUser(id);
        } catch (Exception e) {
            System.out.println("************Error***********");
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}

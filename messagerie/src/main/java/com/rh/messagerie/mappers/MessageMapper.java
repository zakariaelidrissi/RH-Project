package com.rh.messagerie.mappers;

import com.rh.messagerie.dto.MessageRequest;
import com.rh.messagerie.dto.MessageResponse;
import com.rh.messagerie.entities.Message;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    Message messageRequestToMessage(MessageRequest request);

    MessageResponse messageToMessageResponse(Message customer);


}

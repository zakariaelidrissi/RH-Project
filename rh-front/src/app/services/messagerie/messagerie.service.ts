import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/models/conversation';
import { Message } from 'src/app/models/message';
import { MessageRequest } from 'src/app/models/messageRequest';
import { MiniMessage } from 'src/app/models/mini_message';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  getLastContacted(id: number): Observable<MiniMessage[]> {
    return this.httpClient.get<MiniMessage[]>(this.url + "last-contacted/" + id);
  }

  url: string = "http://localhost:8087/";
  constructor(private httpClient: HttpClient) { }

  getConversation(userId1: number, userId2: number): Observable<Conversation> {
    return this.httpClient.get<Conversation>(this.url + "conversation/" + userId1 + "/" + userId2);
  }
  sendMessage(body: MessageRequest): Observable<any> {
    return this.httpClient.post<any>(this.url + "send-message", body);
  }
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "users");
  }
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.url + "users/email/" + email);
  }
}

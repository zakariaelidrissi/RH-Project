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
  sendFile(from: number, to: number, files: FileList): Observable<any> {
    const formData = new FormData();
    Array.from(files).forEach(f => {
      formData.append("files", f, f.name);
    })
    return this.httpClient.post<any>(this.url + "send-file/" + from + "/" + to, formData);
  }
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + "users");
  }
  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.url + "users/email/" + email);
  }

  downloadFile(id: number, filename: string): Observable<any> {
    console.log(this.url + "download-file/" + filename + "/" + id);

    return this.httpClient.get<any>(this.url + "download-file/" + filename + "/" + id);
  }
}

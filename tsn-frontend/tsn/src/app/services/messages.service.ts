import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Message {
  sender_username : string,
  receiver_username : string,
  text : string,
  image : string,
  date : Date
}

@Injectable({
  providedIn: "root"
})
export class MessageService {

  private apiUrl = 'http://localhost:3000/api/messages'

  constructor(private http : HttpClient) {}

  getMessages(user1: string, user2: string) {
    return this.http.get<Message[]>(`${this.apiUrl}?user1=${user1}&user2=${user2}`);
  }

  sendMessage(sender: string, receiver: string, text: string, imageBase64?: string) {
    return this.http.post<Message>(this.apiUrl, {
      sender_username: sender,
      receiver_username: receiver,
      text,
      image: imageBase64 || null
    });
  }

}

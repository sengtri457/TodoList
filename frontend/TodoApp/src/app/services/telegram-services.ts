import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TelegramServices {
  constructor(private http: HttpClient) {}

  private botToken = "8592556629:AAGVwsVGzaJ-fBhZmlvuy7cL6NtpxcvnVLs";
  private chatId = "-4997825985";

  sendMessage(msg: any) {
    debugger;
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const body = {
      chat_id: this.chatId,
      text: msg,
    };
    console.log("Data sent:", body);
    return this.http.post(url, body);
  }
}
